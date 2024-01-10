import { SaddlebagItemSubtypes } from '../../types';

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

export default saddlebagWeaponSubtypeToBeyondSubtype;
