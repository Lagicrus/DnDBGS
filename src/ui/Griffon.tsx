import React from 'react';
import { getCurrentTab } from '../utils/utils';

interface GriffonProps {
  modalOpen: boolean;
}

/*
  Handles the UI needed for the Griffon's Saddlebag integration.
 */
const Griffon = ({ modalOpen }: GriffonProps) => {
  async function onClick() {
    const tabs = await getCurrentTab();
    if (!tabs?.id) return;

    try {
      await chrome.scripting.executeScript({
        target: { tabId: tabs.id as number },
        files: ['static/js/gsbi.js']
      });
    } catch (e: any) {
      console.warn(e.message || e);
      return;
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
