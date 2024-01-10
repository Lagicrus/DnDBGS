import {
  DOMMessage,
  DOMMessageResponse,
  SaddlebagItem,
  SaddlebagItemTypes
} from '../types';
import { magicItemCreator } from './DnDBeyond';

const metaDescriptionParser = (metaDescription: string) => {
  const [weaponType, rarity] = metaDescription.split(', ');
  const attunement = rarity.includes('requires attunement');

  return {
    weaponType,
    rarity,
    attunement
  };
};

const extractItemDataFromDocument = (dom: Document) => {
  const modal = dom.querySelector('.saddlebag-item-card');
  if (!modal) {
    return;
  }

  const name = modal.querySelectorAll(
    '[class^="ItemDetailModal_cardItemName"]'
  );

  const metaDescription = modal.querySelectorAll(
    '[class^="ItemDetailModal_cardMetaDescription"]'
  );

  return {
    name: name[0]?.textContent || '',
    rarity: metaDescription[0].textContent
  };
};

const baseItemType = (itemType: SaddlebagItemTypes) => {
  if (itemType === 'Weapon') {
    return 'Weapon';
  } else if (itemType === 'Armor') {
    return 'Armor';
  }
  return 'Item';
};

const extractItemDataFromLocalStorage = () => {
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

  console.log(item);

  // if (item.itemType === 'Weapon') {
  //   return {
  //     name: item.name,
  //     rarity: item.rarity,
  //     baseItemType: baseItemType(item.itemType),
  //     weaponType: item.itemSubtype
  //   };
  // } else if (item.itemType === 'Armor') {
  //   return {
  //     name: item.name,
  //     rarity: item.rarity,
  //     baseItemType: baseItemType(item.itemType),
  //     armorType: item.itemSubtype
  //   };
  // }

  return magicItemCreator(item);
};

const modalOpenCheck = () => {
  const itemData = window.localStorage.getItem('items');
  if (!itemData) {
    return false;
  }
  const jsonItemData = JSON.parse(itemData);
  const itemId = document.URL.split('/').pop();

  if (!itemId) {
    return false;
  }

  const item: SaddlebagItem | undefined = jsonItemData[itemId];
  return !!item;
};

// Function called when a new message is received
const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender | browser.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  console.log('[content.js]. Message received', msg);

  switch (msg.type) {
    case 'GET_DOM':
      extractItemDataFromDocument(document);
      const response: DOMMessageResponse | undefined =
        extractItemDataFromLocalStorage();

      browser.storage.local.set({ item: response });

      if (!response) {
        return;
      }

      sendResponse(response);
      break;
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
console.log('test');
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
console.log(chrome.runtime.onMessage.hasListeners());
// browser.runtime.onMessage.addListener(messagesFromReactAppListener);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  );
  if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' });
});
