import React, { useEffect } from 'react';
import './App.css';
import { getCurrentTab } from './utils/utils';
import MainPage from './pages/mainPage';
import SettingsPage from './pages/settingsPage';
import { SaddlebagMagicItem } from './chromeServices/DnDBeyond';

function App() {
  const [saddlebagItem, setSaddlebagItem] = React.useState<
    SaddlebagMagicItem | undefined
  >();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState<chrome.tabs.Tab>();
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  useEffect(() => {
    chrome.storage.local.get('item').then(item => {
      setSaddlebagItem(item.item);
    });

    getCurrentTab().then(tab => {
      setCurrentTab(tab);
      setModalOpen(tab?.url?.includes('thegriffonssaddlebag.com') || false);
    });
  }, []);

  useEffect(() => {
    function monitorStorage(changes: Record<string, any>, area: string) {
      if (area === 'local' && changes.item) {
        setSaddlebagItem(changes.item.newValue);
      }
    }

    chrome.storage.onChanged.addListener(monitorStorage);

    return () => {
      chrome.storage.onChanged.removeListener(monitorStorage);
    };
  }, []);

  const settingsOnClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button id="settings" onClick={settingsOnClick}>
          ⚙️
        </button>
        {settingsOpen ? (
          <SettingsPage />
        ) : (
          <MainPage
            modalOpen={modalOpen}
            saddlebagItem={saddlebagItem}
            setSaddlebagItem={setSaddlebagItem}
            currentTab={currentTab}
          />
        )}
      </header>
    </div>
  );
}

export default App;
