import { SaddlebagItemDetails } from '../types';

export async function getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  return tab ?? undefined;
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fillInField(element: HTMLInputElement, text: string) {
  const splitText = text.split('');
  // Reset value
  element.value = '';

  for await (const char of splitText) {
    element.value += char;
    await sleep(randomIntFromInterval(50, 150));
  }
}

export function inFirefox() {
  try {
    return browser !== undefined;
  } catch (e) {
    return false;
  }
}

export async function getSettings() {
  if (inFirefox()) {
    return await browser.storage.sync.get('showMagicItemImages');
  } else {
    return chrome.storage.sync.get('showMagicItemImages');
  }
}

export function anyKeysNotZero(obj: any) {
  return Object.keys(obj).some(key => obj[key] !== 0);
}

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
