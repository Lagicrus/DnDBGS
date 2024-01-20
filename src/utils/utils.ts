import { SaddlebagItemDetails } from '../types';

// A wrapper for getting the current tab
export async function getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  return tab ?? undefined;
}

// Random number generator between intervals
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Sleep function for async/await
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Fill in a field with text wrapper
export async function fillInField(element: HTMLInputElement, text: string) {
  const splitText = text.split('');
  // Reset value
  element.value = '';

  for await (const char of splitText) {
    element.value += char;
    await sleep(randomIntFromInterval(50, 150));
  }
}

// Check if we are in Firefox or Chrome
// As chrome doesn't support browser
export function inFirefox() {
  try {
    return browser !== undefined;
  } catch (e) {
    return false;
  }
}

// Get the settings from local storage
export async function getSettings() {
  if (inFirefox()) {
    return await browser.storage.sync.get('showMagicItemImages');
  } else {
    return chrome.storage.sync.get('showMagicItemImages');
  }
}

// Check if any keys in an object are not 0
export function anyKeysNotZero(obj: any) {
  return Object.keys(obj).some(key => obj[key] !== 0);
}

// Convert the details to a list of string orders so we can iterate over them
export function detailsToOrderList(details: SaddlebagItemDetails) {
  const list = [];

  if (details.bonuses) {
    for (const [key, value] of Object.entries(details.bonuses)) {
      if (value !== 0) {
        list.push(`bonuses-${key}-${value}`);
      }
    }
  }

  return list;
}
