import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';
import { fillInField } from './utils';
import {
  selectArmorSubtype,
  selectItemBaseType,
  selectMagicItemSubtype,
  selectRarity,
  selectWeaponSubtype
} from './selectWrappers';
import { typeDescription } from './description';

async function fillForm(params: { magicItem: SaddlebagMagicItem }) {
  const magicItemName = document.getElementById('field-name');
  await fillInField(
    magicItemName as HTMLInputElement,
    params.magicItem.name || 'test'
  );

  const magicItemVersion = document.getElementById('field-version');
  await fillInField(magicItemVersion as HTMLInputElement, '5'); // 5 or 5e

  const magicItemRarity = document.getElementById('field-rarity');
  selectRarity(magicItemRarity as HTMLSelectElement, params.magicItem.rarity);

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
  } else if (params.magicItem.magicItemType === 'Armor') {
    const magicItemBaseArmorType = document.getElementById('field-base-armor');
    selectArmorSubtype(
      magicItemBaseArmorType as HTMLSelectElement,
      params.magicItem.itemSubtype
    );
  } else {
    const magicItemType = document.getElementById('field-type');
    selectMagicItemSubtype(
      magicItemType as HTMLSelectElement,
      params.magicItem.magicItemType
    );
  }

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

  typeDescription(params.magicItem.description);

  return {
    success: true
  };
}

chrome.storage.local.get('item', async function (item) {
  if (item.item) {
    await fillForm({ magicItem: item.item });
  }
});
