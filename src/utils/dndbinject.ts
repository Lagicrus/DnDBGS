import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';
import {
  SaddlebagItemRarity,
  SaddlebagItemSubtypes,
  SaddlebagItemTypes
} from '../types';
import saddlebagWeaponSubtypeToBeyondSubtype from './mappers/baseWeapon';
import saddlebagRarityToBeyondRarity from './mappers/rarity';
import { fillInField } from './utils';

async function fillForm(params: { magicItem: SaddlebagMagicItem }) {
  async function selectRarity(
    element: HTMLSelectElement,
    rarity: SaddlebagItemRarity
  ) {
    const beyondRarity = saddlebagRarityToBeyondRarity(rarity);
    element.value = beyondRarity.toString();
  }

  function selectItemBaseType(
    element: HTMLSelectElement,
    itemType: SaddlebagItemTypes
  ) {
    // TODO maybe fish these out of the DOM instead of hardcoding
    if (itemType === 'Weapon') {
      element.value = '1782728300';
      // Needed to make the page notice we changed the value
      // And unlock the next input field
      element.dispatchEvent(new Event('change'));
    } else if (itemType === 'Armor') {
      element.value = '701257905';
      // Needed to make the page notice we changed the value
      // And unlock the next input field
      element.dispatchEvent(new Event('change'));
    }
  }

  function selectItemType(
    element: HTMLSelectElement,
    itemType: SaddlebagItemTypes
  ) {
    switch (itemType) {
      case 'Wondrous item':
        element.value = '10';
        break;
      case 'Rod':
        element.value = '5';
        break;
      case 'Scroll':
        element.value = '6';
        break;
      case 'Staff':
        element.value = '7';
        break;
      case 'Wand':
        element.value = '8';
        break;
      case 'Ring':
        element.value = '4';
        break;
      case 'Potion':
        element.value = '3';
        break;
    }
  }

  function selectWeaponSubtype(
    element: HTMLSelectElement,
    itemType: SaddlebagItemSubtypes
  ) {
    const beyondSubtype = saddlebagWeaponSubtypeToBeyondSubtype(itemType);
    // TODO find out why its undefined
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.value = beyondSubtype.toString();
  }

  const magicItemForm = document.getElementById('magic-item-form');

  const magicItemName = document.getElementById('field-name');
  await fillInField(
    magicItemName as HTMLInputElement,
    params.magicItem.name || 'test'
  );

  const magicItemVersion = document.getElementById('field-version');
  await fillInField(magicItemVersion as HTMLInputElement, '5'); // 5 or 5e

  const magicItemRarity = document.getElementById('field-rarity');
  await selectRarity(
    magicItemRarity as HTMLSelectElement,
    params.magicItem.rarity
  );

  const magicItemBaseType = document.getElementById('field-item-base-type');
  selectItemBaseType(
    magicItemBaseType as HTMLSelectElement,
    params.magicItem.magicItemType
  );

  if (params.magicItem.magicItemType === 'Weapon') {
    const magicItemBaseWeaponType =
      document.getElementById('field-base-weapon');
    selectWeaponSubtype(
      magicItemBaseWeaponType as HTMLSelectElement,
      params.magicItem.itemSubtype
    );
  }
  // TODO handle armour and items

  const magicItemAttunementCheckbox =
    document.getElementsByClassName('fc-fake-item')[0];
  const magicItemAttunementDescription = document.getElementById(
    'field-attunement-description'
  );
  if (params.magicItem.attunement) {
    magicItemAttunementCheckbox?.dispatchEvent(new Event('click'));
    await fillInField(
      magicItemAttunementDescription as HTMLInputElement,
      params.magicItem.attunementDescription || 'Requires attunement'
    );
  }

  // iframe
  const magicItemDescriptionEditor = document.getElementById(
    'field-item-description-wysiwyg_ifr'
  ) as HTMLIFrameElement;
  const magicItemDescription =
    magicItemDescriptionEditor?.contentWindow?.document.getElementsByTagName(
      'body'
    );
  if (magicItemDescription) {
    if (magicItemDescription[0]) {
      const splitNewlines = params.magicItem.description.split('\n\n');
      const splitNewlinesWithP = splitNewlines.map(line => `<p>${line}</p>`);
      const joinedNewlines = splitNewlinesWithP.join('');

      magicItemDescription[0].innerHTML = joinedNewlines.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );
    }
  }

  return {
    success: true
  };
}

chrome.storage.local.get('item', async function (item) {
  if (item.item) {
    await fillForm({ magicItem: item.item });
  }
});