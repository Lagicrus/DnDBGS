import React from 'react';
import { getCurrentTab } from '../utils/utils';
import { DOMMessageResponse, SaddlebagItem } from '../types';
import {
  magicItemCreator,
  SaddlebagMagicItem
} from '../chromeServices/DnDBeyond';
import InjectionResult = chrome.scripting.InjectionResult;

interface GriffonProps {
  modalOpen: boolean;
  setSaddlebagItems: React.Dispatch<
    React.SetStateAction<Exclude<DOMMessageResponse, boolean> | undefined>
  >;
}

const Griffon = ({ modalOpen, setSaddlebagItems }: GriffonProps) => {
  async function onClick() {
    const tabs = await getCurrentTab();
    if (!tabs?.id) return;

    let res: InjectionResult<SaddlebagMagicItem | undefined>[];
    try {
      res = await chrome.scripting.executeScript({
        target: { tabId: tabs.id as number },
        func: griffonItemInject
      });
    } catch (e: any) {
      console.warn(e.message || e);
      return;
    }

    if (!res[0].result) {
      // Show error message?
      return;
    }
    await chrome.storage.local.set({ item: res[0].result });
    setSaddlebagItems(res[0].result);

    function griffonItemInject() {
      const itemData = window.localStorage.getItem('items');
      if (!itemData) {
        return;
      }

      const jsonItemData = JSON.parse(itemData);
      const itemId = document.URL.split('/').pop();

      if (!itemId) {
        return;
      }

      const item: SaddlebagItem | undefined = jsonItemData[itemId];

      if (!item) {
        return;
      }

      async function imageToBase64(imageUrl: string): Promise<string> {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        });
      }

      async function imageIdToImageUrl(imageId: string) {
        const jsonResponse = await fetch(
          `https://firebasestorage.googleapis.com/v0/b/griffons-saddlebag.appspot.com/o/images%2F${imageId}%2Fmedium.png`
        );
        const json = await jsonResponse.json();
        return json.downloadTokens;
      }

      return imageIdToImageUrl(item.imageIds[0]).then(downloadToken => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/griffons-saddlebag.appspot.com/o/images%2F${item.imageIds[0]}%2Fmedium.png?alt=media&token=${downloadToken}`;
        return imageToBase64(imageUrl).then(image => {
          return magicItemCreator(item, image);
        });
      });
    }
  }

  return (
    <>
      {modalOpen ? (
        <button onClick={onClick}>Get current Magic Item</button>
      ) : (
        <p>Open a magic item first</p>
      )}
    </>
  );
};

export default Griffon;
