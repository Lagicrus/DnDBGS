import React, { useEffect } from 'react';
import { inFirefox } from '../utils/utils';

interface Options {
  showMagicItemImages: boolean;
}

const defaultOptions: Options = {
  showMagicItemImages: true
};

export default function SettingsPage() {
  const [options, setOptions] = React.useState({} as Options);
  const [optionsSaved, setOptionsSaved] = React.useState(false);

  useEffect(() => {
    if (inFirefox()) {
      browser.storage.sync.get('showMagicItemImages').then(items => {
        const mergedOptions: Options = Object.assign({}, items, defaultOptions);
        setOptions(mergedOptions);
      });
    } else {
      chrome.storage.sync.get('showMagicItemImages', items => {
        const mergedOptions: Options = Object.assign({}, items, defaultOptions);
        setOptions(mergedOptions);
      });
    }
  }, []);

  async function toggleShowMagicItemImages() {
    if (inFirefox()) {
      await browser.storage.sync.set({
        showMagicItemImages: !options.showMagicItemImages
      });
      setOptionsSaved(true);
      setTimeout(() => {
        setOptionsSaved(false);
      }, 1000);
    } else {
      chrome.storage.sync.set(
        {
          showMagicItemImages: !options.showMagicItemImages
        },
        () => {
          setOptionsSaved(true);
          setTimeout(() => {
            setOptionsSaved(false);
          }, 1000);
        }
      );
    }
    setOptions({
      ...options,
      showMagicItemImages: !options.showMagicItemImages
    });
  }

  if (!options) return <div>Loading...</div>;
  return (
    <>
      <div>Mechanical Bag</div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={options.showMagicItemImages}
            onClick={toggleShowMagicItemImages}
          />
          Show Magic Item image
        </label>
      </div>
      {optionsSaved && <div id="optionsSaved">Options saved</div>}
    </>
  );
}
