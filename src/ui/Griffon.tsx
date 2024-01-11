import React from 'react';
import { getCurrentTab } from '../utils/utils';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';
import InjectionResult = chrome.scripting.InjectionResult;

interface GriffonProps {
  modalOpen: boolean;
  setSaddlebagItem: React.Dispatch<
    React.SetStateAction<SaddlebagMagicItem | undefined>
  >;
}

const Griffon = ({ modalOpen, setSaddlebagItem }: GriffonProps) => {
  async function onClick() {
    const tabs = await getCurrentTab();
    if (!tabs?.id) return;

    let res: InjectionResult<SaddlebagMagicItem | undefined>[];
    try {
      res = await chrome.scripting.executeScript({
        target: { tabId: tabs.id as number },
        files: ['static/js/gsbi.js']
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
    setSaddlebagItem(res[0].result);
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
