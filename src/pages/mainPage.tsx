import React from 'react';
import MagicItem from '../ui/MagicItem';
import Griffon from '../ui/Griffon';
import Beyond from '../ui/Beyond';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';

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
  return (
    <>
      <MagicItem saddlebagItem={saddlebagItem} />
      {currentTab?.url?.includes('thegriffonssaddlebag.com') ? (
        <Griffon modalOpen={modalOpen} setSaddlebagItem={setSaddlebagItem} />
      ) : (
        <Beyond magicItem={saddlebagItem} currentTab={currentTab} />
      )}
    </>
  );
}
