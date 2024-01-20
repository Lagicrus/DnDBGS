import React, { useEffect } from 'react';
import { getSettings, inFirefox } from '../utils/utils';

export interface Settings {
  showMagicItemImages: boolean;
}

const defaultOptions: Settings = {
  showMagicItemImages: true
};

/*
  Basic settings page for the extension. Currently only has one setting, but
  could be expanded to have more.
 */
export default function SettingsPage() {
  const [options, setOptions] = React.useState({} as Settings);
  const [optionsSaved, setOptionsSaved] = React.useState(false);

  // On page load, get the current settings from storage and set them in state
  useEffect(() => {
    getSettings().then(options => {
      const mergedOptions: Settings = Object.keys(defaultOptions).reduce(
        (acc, key) => {
          // Merge the default options with the options from storage
          // So if the user has not set a setting, it will use the default
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
    // Save the new setting to storage
    // We need to detect the browser as they save settings differently
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
