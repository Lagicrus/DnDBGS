import {
  SaddlebagItemRarity,
  SaddlebagItemSubtypes,
  SaddlebagItemTypes
} from '../types';
import saddlebagRarityToBeyondRarity from './mappers/rarity';
import saddlebagWeaponSubtypeToBeyondSubtype from './mappers/baseWeapon';
import saddlebagArmorSubtypeToBeyondSubtype from './mappers/baseArmor';
import saddlebagMagicItemSubtypeToBeyondSubtype from './mappers/baseItem';

export function selectRarity(
  element: HTMLSelectElement,
  rarity: SaddlebagItemRarity
) {
  const beyondRarity = saddlebagRarityToBeyondRarity(rarity);
  element.value = beyondRarity.toString();
}

export function selectItemBaseType(
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

export function selectWeaponSubtype(
  element: HTMLSelectElement,
  itemType: SaddlebagItemSubtypes
) {
  const beyondSubtype = saddlebagWeaponSubtypeToBeyondSubtype(itemType);
  // TODO find out why its undefined
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  element.value = beyondSubtype.toString();
}

export function selectArmorSubtype(
  element: HTMLSelectElement,
  itemType: SaddlebagItemSubtypes
) {
  const beyondSubtype = saddlebagArmorSubtypeToBeyondSubtype(itemType);
  element.value = beyondSubtype.toString();
}

export function selectMagicItemSubtype(
  element: HTMLSelectElement,
  itemType: SaddlebagItemTypes
) {
  const beyondSubtype = saddlebagMagicItemSubtypeToBeyondSubtype(itemType);
  element.value = beyondSubtype.toString();
}
