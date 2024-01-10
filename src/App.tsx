import React, { useEffect } from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';
import Griffon from './ui/Griffon';

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  return tab.url ?? undefined;
}

function App() {
  const [saddlebagItems, setSaddlebagItems] =
    React.useState<Exclude<DOMMessageResponse, boolean>>();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState<string>();

  useEffect(() => {
    chrome.storage.local.get('item').then(item => {
      setSaddlebagItems(item.item);
      if (!item?.item) {
        chrome.storage.local.set({ item: ['test'] });
      }
    });

    getCurrentTab().then(tab => {
      console.log(tab);
      setCurrentTab(tab);
      setModalOpen(tab?.includes('thegriffonssaddlebag.com') || false);
    });

    // chrome.tabs &&
    //   chrome.tabs.query(
    //     {
    //       active: true,
    //       currentWindow: true
    //     },
    //     tabs => {
    //       if (!tabs[0].id) return;
    //
    //       setCurrentTab(tabs[0]);
    //       setModalOpen(
    //         tabs[0]?.url?.includes('thegriffonssaddlebag.com') || false
    //       );
    //     }
    //   );
  }, []);

  function onClick() {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        tabs => {
          if (!tabs[0].id) return;

          (async () => {
            const response = await chrome.runtime.sendMessage({
              greeting: 'hello'
            });
            // do something with response here, not outside the function
            console.log(response);
          })();

          (async () => {
            const [{ result }] = await chrome.scripting.executeScript({
              target: { tabId: tabs[0].id as number },
              func: () => document.querySelector('.saddlebag-item-card')
            });
            console.log(result);
            // document.body.textContent = result;
          })();

          (async () => {
            const [tab] = await chrome.tabs.query({
              active: true,
              currentWindow: true
            });
            let res;
            try {
              res = await chrome.scripting.executeScript({
                target: { tabId: tab.id as number },
                func: inContent2,
                args: [{ foo: 'bar' }] // arguments must be JSON-serializable
              });
            } catch (e: any) {
              console.warn(e.message || e);
              return;
            }
            // res[0] contains results for the main page of the tab
            document.body.textContent = JSON.stringify(res[0].result);
          })();

          // executeScript runs this code inside the tab
          function inContent2(params: { foo: string | null }) {
            const el = document.createElement('div');
            el.style.cssText =
              'position:fixed; top:0; left:0; right:0; background:red';
            el.textContent = params.foo;
            document.body.appendChild(el);
            return {
              success: true,
              name: document.querySelector('.saddlebag-item-card')?.textContent
            };
          }

          // chrome.tabs
          //   .executeScript(tabs[0].id, {
          //     file: 'static/js/content.js'
          //   })
          //   .then(() => {
          //     console.log('Injected content script');
          //   });

          // (async () => {
          //   const response = await chrome.tabs.sendMessage(0, {
          //     type: 'GET_DOM'
          //   } as DOMMessage);
          //   console.log(response);
          // })();
          //
          // chrome.runtime
          //   .sendMessage({
          //     type: 'GET_DOM',
          //     tabId: tabs[0].id
          //   } as DOMMessage)
          //   .then(response => {
          //     console.log(response);
          //   });
          //
          // console.log(tabs);

          chrome.tabs.sendMessage(
            tabs[0].id,
            { type: 'GET_DOM' } as DOMMessage,
            (response: DOMMessageResponse) => {
              if (typeof response !== 'boolean') {
                setSaddlebagItems(response);
              }
            }
          );
        }
      );
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Loaded Magic Item: {saddlebagItems?.name}</p>
        {currentTab?.includes('thegriffonssaddlebag.com') ? (
          <Griffon modalOpen={modalOpen} onClick={onClick} />
        ) : null}
      </header>
    </div>
  );
}

export default App;
