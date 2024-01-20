import React from 'react';
import MagicItem from '../ui/MagicItem';
import Griffon from '../ui/Griffon';
import Beyond from '../ui/Beyond';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';
import BeyondDetailsInfo from '../ui/BeyondDetailsInfo';

interface MainPageProps {
  saddlebagItem: SaddlebagMagicItem | undefined;
  currentTab: chrome.tabs.Tab | undefined;
  modalOpen: boolean;
  setSaddlebagItem: React.Dispatch<
    React.SetStateAction<SaddlebagMagicItem | undefined>
  >;
}

/*
  Renders and handles the main page of the extension
 */
export default function MainPage({
  saddlebagItem,
  currentTab,
  modalOpen,
  setSaddlebagItem
}: MainPageProps) {
  const [showOtherDetails, setShowOtherDetails] = React.useState(false);

  const toggleShowOtherDetails = () => {
    setShowOtherDetails(!showOtherDetails);
  };

  // Override to show processed details of a magic item
  // if the user has clicked the info button on the Beyond page
  if (showOtherDetails) {
    return (
      <BeyondDetailsInfo
        toggleShowOtherDetails={toggleShowOtherDetails}
        magicItem={saddlebagItem}
      />
    );
  }

  return (
    <>
      <MagicItem saddlebagItem={saddlebagItem} />
      {currentTab?.url?.includes('thegriffonssaddlebag.com') ? (
        <Griffon modalOpen={modalOpen} />
      ) : (
        <Beyond
          magicItem={saddlebagItem}
          currentTab={currentTab}
          toggleShowOtherDetails={toggleShowOtherDetails}
        />
      )}
    </>
  );
}
