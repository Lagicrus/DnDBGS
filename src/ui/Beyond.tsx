import React, { useEffect } from 'react';
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
  const [inProgress, setInProgress] = React.useState<boolean>(false);
  const [trackCurrentUrl, setTrackCurrentUrl] = React.useState<boolean>(false);

  useEffect(() => {
    if (!trackCurrentUrl) return;
    chrome.scripting.executeScript({
      target: { tabId: currentTab?.id as number },
      files: ['static/js/dndbidetails.js']
    });
  }, [trackCurrentUrl, currentTab?.url]);

  useEffect(() => {
    function monitorStorage(changes: Record<string, any>, area: string) {
      if (area === 'local' && changes.orderStatus) {
        if (changes.orderStatus.newValue === 'started') {
          setInProgress(true);
        } else if (changes.orderStatus.newValue === 'finished') {
          setInProgress(false);
        }
      }
    }

    chrome.storage.onChanged.addListener(monitorStorage);

    return () => {
      chrome.storage.onChanged.removeListener(monitorStorage);
    };
  }, []);

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
    setTrackCurrentUrl(true);
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
    ) ||
    currentTab?.url?.match(/dndbeyond\.com\/modifier\/create\/\d{7}-\d{9}\/\d/)
  ) {
    return (
      <div className="otherDetailsContainer">
        <button disabled={!inProgress} onClick={fillInMagicItemDetails}>
          Fill in other details
        </button>
        <button onClick={toggleShowOtherDetails}>ℹ️</button>
        {inProgress && <span>🔁</span>}
      </div>
    );
  }

  return <p>You are on a unsupported page</p>;
};

export default Beyond;
