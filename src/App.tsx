import React, { useEffect } from 'react';
import './App.css';
import { DOMMessageResponse } from './types';
import Griffon from './ui/Griffon';
import Beyond from './ui/Beyond';
import { getCurrentTab } from './utils/utils';

function App() {
  const [saddlebagItems, setSaddlebagItems] =
    React.useState<Exclude<DOMMessageResponse, boolean>>();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState<chrome.tabs.Tab>();

  useEffect(() => {
    chrome.storage.local.get('item').then(item => {
      setSaddlebagItems(item.item);
      if (!item?.item) {
        chrome.storage.local.set({ item: ['test'] });
      }
    });

    getCurrentTab().then(tab => {
      setCurrentTab(tab);
      setModalOpen(tab?.url?.includes('thegriffonssaddlebag.com') || false);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Loaded Magic Item: {saddlebagItems?.name}</p>
        {currentTab?.url?.includes('thegriffonssaddlebag.com') ? (
          <Griffon
            modalOpen={modalOpen}
            setSaddlebagItems={setSaddlebagItems}
          />
        ) : (
          <Beyond magicItem={saddlebagItems} />
        )}
      </header>
    </div>
  );
}

export default App;
