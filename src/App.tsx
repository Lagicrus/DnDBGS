import React, { useEffect } from 'react';
import './App.css';
import { DOMMessageResponse } from './types';
import Griffon from './ui/Griffon';
import Beyond from './ui/Beyond';
import { getCurrentTab } from './utils/utils';
import MagicItem from './ui/MagicItem';

function App() {
  const [saddlebagItem, setSaddlebagItem] =
    React.useState<Exclude<DOMMessageResponse, boolean>>();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState<chrome.tabs.Tab>();

  useEffect(() => {
    chrome.storage.local.get('item').then(item => {
      setSaddlebagItem(item.item);
    });

    getCurrentTab().then(tab => {
      setCurrentTab(tab);
      setModalOpen(tab?.url?.includes('thegriffonssaddlebag.com') || false);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <MagicItem saddlebagItem={saddlebagItem} />
        {currentTab?.url?.includes('thegriffonssaddlebag.com') ? (
          <Griffon modalOpen={modalOpen} setSaddlebagItems={setSaddlebagItem} />
        ) : (
          <Beyond magicItem={saddlebagItem} />
        )}
      </header>
    </div>
  );
}

export default App;
