import React, { useEffect } from 'react';
import { getSettings, inFirefox } from '../utils/utils';

export interface Settings {
  showMagicItemImages: boolean;
}

const defaultOptions: Settings = {
  showMagicItemImages: true
};

export default function SettingsPage() {
  const [options, setOptions] = React.useState({} as Settings);
  const [optionsSaved, setOptionsSaved] = React.useState(false);

  useEffect(() => {
    getSettings().then(options => {
      const mergedOptions: Settings = Object.keys(defaultOptions).reduce(
        (acc, key) => {
          acc[key as keyof typeof defaultOptions] =
            options[key] ?? defaultOptions[key as keyof typeof defaultOptions];
          return acc;
        },
        {} as Settings
      );
      setOptions(mergedOptions);
    });
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
