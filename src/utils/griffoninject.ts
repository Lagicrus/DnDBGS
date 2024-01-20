import { SaddlebagItem } from '../types';
import { getSettings } from './utils';
import { Settings } from '../pages/settingsPage';
import { magicItemCreator } from '../chromeServices/DnDBeyond';

// Main wrapper function to get the item data from local storage and save it
async function griffonItemInject() {
  // Get the item data from local storage due to firebase
  const itemData = window.localStorage.getItem('items');
  if (!itemData) {
    return;
  }

  const jsonItemData = JSON.parse(itemData);
  // Example URL: https://ledger.thegriffonssaddlebag.com/items/OyeGfk7VRQEfEoEVyTjt
  const itemId = document.URL.split('/').pop();

  if (!itemId) {
    return;
  }

  // Get the item that the user currently has open
  const item: SaddlebagItem | undefined = jsonItemData[itemId];

  if (!item) {
    return;
  }

  // Convert the image to base64 so we can save it to local storage
  async function imageToBase64(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
    });
  }

  // Get the download token for the image so we can get the image URL
  async function imageIdToImageUrl(imageId: string) {
    const jsonResponse = await fetch(
      `https://firebasestorage.googleapis.com/v0/b/griffons-saddlebag.appspot.com/o/images%2F${imageId}%2Fmedium.png`
    );
    const json = await jsonResponse.json();
    return json.downloadTokens;
  }

  const settings = (await getSettings()) as unknown as Settings;
  // If user the has the setting enabled, get the image and save it to local storage
  if (settings.showMagicItemImages) {
    const downloadToken = await imageIdToImageUrl(item.imageIds[0]);
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/griffons-saddlebag.appspot.com/o/images%2F${item.imageIds[0]}%2Fmedium.png?alt=media&token=${downloadToken}`;
    const image = await imageToBase64(imageUrl);
    await chrome.storage.local.set({ item: magicItemCreator(item, image) });
  } else {
    await chrome.storage.local.set({ item: magicItemCreator(item) });
  }
}

if (window.location.href.includes('griffonssaddlebag.com/items')) {
  console.log('running griffonItemInject');
  griffonItemInject();
}
