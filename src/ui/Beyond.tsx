import React from 'react';
import { getCurrentTab } from '../utils/utils';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';
import {
  SaddlebagItemRarity,
  SaddlebagItemSubtypes,
  SaddlebagItemTypes
} from '../types';

async function fillForm(params: { magicItem: SaddlebagMagicItem }) {
  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function fillInField(element: HTMLInputElement, text: string) {
    const splitText = text.split('');
    // Reset value
    element.value = '';

    for await (const char of splitText) {
      element.value += char;
      await sleep(randomIntFromInterval(50, 150));
    }
  }
  function saddlebagRarityToBeyondRarity(rarity: SaddlebagItemRarity) {
    switch (rarity) {
      case 'common':
        return 1;
      case 'uncommon':
        return 2;
      case 'rare':
        return 3;
      case 'very rare':
        return 4;
      case 'legendary':
        return 5;
      case 'artifact':
        return 7;
      case 'rarity varies':
        return 9;
      // TODO - handle these
      case 'uncommon, rare (+1), or very rare (+2)':
        return 0;
      case 'common (single use) or uncommon':
        return 0;
      case 'uncommon or very rare':
        return 0;
      case 'common or rare':
        return 0;
    }
  }
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

  function saddlebagWeaponSubtypeToBeyondSubtype(
    itemType: SaddlebagItemSubtypes
  ) {
    // TODO if we can't find the item type, alert the user to flag this item on Github
    // TODO add test that all weapon types are handled
    switch (itemType) {
      case 'maul':
        return 25;
      case 'longbow':
        return 37;
      case 'dagger and shortsword':
        return 30; // Just shortsword
      case 'shield':
      case undefined:
      case 'breastplate':
      case 'leather':
      case 'half plate':
      case 'light':
      case 'padded or hide':
      case 'leather or studded leather':
        return 0; // No subtype
      case 'arrow':
      case 'arrow or bolt':
      case 'dart':
        return 16; // TODO - handle arrow and arrow or bolt
      case 'halberd':
        return 23;
      case 'greataxe':
        return 21;
      case 'any bow':
      case 'any bow or crossbow':
        return 37; // TODO currently longbow, what about shortbow?
      case 'crossbow, heavy or light':
        return 15; // TODO currently heavy, what about light and hand?
      case 'shortsword':
        return 30;
      case 'longsword':
        return 4;
      case 'greatsword':
        return 22;
      case 'any slashing or piercing simple weapon':
      case 'any sword':
        return 30; // TODO currently shortsword, handle others
      case 'war pick':
        return 32;
      case 'scimitar':
        return 29;
      case 'whip':
        return 34;
      case 'maul or warhammer':
        return 25; // TODO currently maul, what about warhammer?
      case 'spear':
        return 14;
      case 'any hammer':
        return 33; // TODO currently warhammer, what about others?
      case 'mace':
        return 11;
      case 'any axe':
        return 21; // TODO currently greataxe, what about others?
      case 'shortbow':
        return 17;
      case 'greatclub':
        return 6;
      case 'quarterstaff':
        return 12;
      case 'dagger':
        return 3;
      case 'javelin or spear':
        return 8; // TODO currently javelin, what about spear?
      case 'crossbow, hand':
        return 1;
      case 'flail':
        return 20;
      case 'quarterstaff or shortsword':
        return 12; // TODO currently quarterstaff, what about shortsword?
      case 'lance':
        return 24;
      case 'trident':
        return 31;
      case 'rapier':
        return 28;
      case 'club or greatclub':
        return 6; // TODO currently greatclub, what about club?
      case 'sling':
        return 18;
      case 'glaive':
        return 2;
      case 'rapier or shortsword':
        return 28; // TODO currently rapier, what about shortsword?
      case 'crossbow, heavy':
        return 36;
      case 'longsword or rapier':
        return 4; // TODO currently longsword, what about rapier?
      case 'crossbow, light':
        return 15;
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

const Beyond = ({
  magicItem
}: {
  magicItem: SaddlebagMagicItem | undefined;
}) => {
  const onClick = async () => {
    const currentTab = await getCurrentTab();
    if (!currentTab) return;
    console.log('clicked');
    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id as number },
      func: fillForm,
      args: [{ magicItem: magicItem as SaddlebagMagicItem }] // arguments must be JSON-serializable
    });
    // res[0] contains results for the main page of the tab
    // document.body.textContent = JSON.stringify(res[0].result);
  };

  if (!magicItem)
    return <p>Select a magic item first from Griffons Saddlebag</p>;

  return <button onClick={onClick}>Fill in form</button>;
};

export default Beyond;
