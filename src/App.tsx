import React, { useEffect } from 'react';
import './App.css';
import { getCurrentTab } from './utils/utils';
import MainPage from './pages/mainPage';
import SettingsPage from './pages/settingsPage';
import { SaddlebagMagicItem } from './chromeServices/DnDBeyond';

/*
  Main App component. This is the root of the application.
 */
function App() {
  const [saddlebagItem, setSaddlebagItem] = React.useState<
    SaddlebagMagicItem | undefined
  >();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState<chrome.tabs.Tab>();
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  // On startup, get the current tab and the saddlebag item from storage
  // and set them in state.
  useEffect(() => {
    chrome.storage.local.get('item').then(item => {
      setSaddlebagItem(item.item);
    });

    getCurrentTab().then(tab => {
      setCurrentTab(tab);
      setModalOpen(tab?.url?.includes('thegriffonssaddlebag.com') || false);
    });
  }, []);

  // Monitor tab changes to see if the current URL changes
  useEffect(() => {
    function monitorTabChange(
      tabId: number,
      changeInfo: chrome.tabs.TabChangeInfo,
      tab: chrome.tabs.Tab
    ) {
      if (tabId === currentTab?.id && changeInfo.status === 'complete') {
        if (!tab) return;
        setCurrentTab(tab);
      }
    }

    chrome.tabs.onUpdated.addListener(monitorTabChange);

    return () => {
      chrome.tabs.onUpdated.removeListener(monitorTabChange);
    };
  }, [currentTab]);

  // Monitor storage changes to see if the saddlebag item changes, so we can update state
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

  // When the settings button is clicked, toggle the settings page
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
