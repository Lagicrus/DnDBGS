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

      return magicItemCreator(item);
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
