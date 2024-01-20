import React from 'react';
import { getCurrentTab } from '../utils/utils';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';

const Beyond = ({
  magicItem,
  currentTab,
  toggleShowOtherDetails
}: {
  magicItem: SaddlebagMagicItem | undefined;
  currentTab: chrome.tabs.Tab | undefined;
  toggleShowOtherDetails: () => void;
}) => {
  const fillInMagicCreationForm = async () => {
    const currentTab = await getCurrentTab();
    if (!currentTab) return;
    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id as number },
      files: ['static/js/dndbi.js']
    });
  };

  const fillInMagicItemDetails = async () => {
    const currentTab = await getCurrentTab();
    if (!currentTab) return;
    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id as number },
      files: ['static/js/dndbidetails.js']
    });
  };

  if (!magicItem)
    return <p>Select a magic item first from Griffons Saddlebag</p>;

  if (
    currentTab?.url?.endsWith(
      'dndbeyond.com/homebrew/creations/create-magic-item/create'
    )
  ) {
    return <button onClick={fillInMagicCreationForm}>Fill in form</button>;
  }

  if (
    currentTab?.url?.match(
      /dndbeyond\.com\/homebrew\/creations\/magic-items\/\d+-.*\/edit/
    )
  ) {
    return (
      <div className="otherDetailsContainer">
        <button onClick={fillInMagicItemDetails}>Fill in other details</button>
        <button onClick={toggleShowOtherDetails}>ℹ️</button>
      </div>
    );
  }

  return <p>You are on a unsupported page</p>;
};

export default Beyond;
