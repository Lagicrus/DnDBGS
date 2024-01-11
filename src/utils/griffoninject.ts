import { SaddlebagItem } from '../types';
import { getSettings } from './utils';
import { Settings } from '../pages/settingsPage';
import { magicItemCreator } from '../chromeServices/DnDBeyond';

async function griffonItemInject() {
  const itemData = window.localStorage.getItem('items');
  if (!itemData) {
    return;
  }

  const jsonItemData = JSON.parse(itemData);
  const itemId = document.URL.split('/').pop();

  if (!itemId) {
    return;
  }

  const item: SaddlebagItem | undefined = jsonItemData[itemId];

  if (!item) {
    return;
  }

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

  async function imageIdToImageUrl(imageId: string) {
    const jsonResponse = await fetch(
      `https://firebasestorage.googleapis.com/v0/b/griffons-saddlebag.appspot.com/o/images%2F${imageId}%2Fmedium.png`
    );
    const json = await jsonResponse.json();
    return json.downloadTokens;
  }

  const settings = (await getSettings()) as unknown as Settings;
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
