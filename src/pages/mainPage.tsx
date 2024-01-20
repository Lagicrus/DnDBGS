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
        <Griffon modalOpen={modalOpen} setSaddlebagItem={setSaddlebagItem} />
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
