import React from 'react';
import { getCurrentTab } from '../utils/utils';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';

const Beyond = ({
  magicItem
}: {
  magicItem: SaddlebagMagicItem | undefined;
}) => {
  const onClick = async () => {
    const currentTab = await getCurrentTab();
    if (!currentTab) return;
    console.log('clicked');
    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id as number },
      files: ['static/js/dndbi.js']
    });
    // res[0] contains results for the main page of the tab
    // document.body.textContent = JSON.stringify(res[0].result);
  };

  if (!magicItem)
    return <p>Select a magic item first from Griffons Saddlebag</p>;

  return <button onClick={onClick}>Fill in form</button>;
};

export default Beyond;
