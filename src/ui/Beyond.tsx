import React from 'react';
import { getCurrentTab } from '../utils/utils';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';

const Beyond = ({
  magicItem,
  currentTab
}: {
  magicItem: SaddlebagMagicItem | undefined;
  currentTab: chrome.tabs.Tab | undefined;
}) => {
  const fillInMagicCreationFrom = async () => {
    const currentTab = await getCurrentTab();
    if (!currentTab) return;
    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id as number },
      files: ['static/js/dndbi.js']
    });
  };

  if (!magicItem)
    return <p>Select a magic item first from Griffons Saddlebag</p>;

  if (
    currentTab?.url?.endsWith(
      'dndbeyond.com/homebrew/creations/create-magic-item/create'
    )
  ) {
    return <button onClick={fillInMagicCreationFrom}>Fill in form</button>;
  }
};

export default Beyond;
