import { SaddlebagItemTypes } from '../../types';

// Converts the string type for Magic Items into the number user by D&D Beyond for the Select element
function saddlebagMagicItemSubtypeToBeyondSubtype(
  itemType: SaddlebagItemTypes
) {
  // TODO if we can't find the magic item type, alert the user to flag this item on Github
  // TODO add test that all magic item types are handled
  switch (itemType) {
    case 'Weapon':
    case 'Armor':
      return 0;
    case 'Wondrous item':
      return 10;
    case 'Ring':
      return 4;
    case 'Rod':
      return 5;
    case 'Potion':
      return 3;
    case 'Wand':
      return 8;
    case 'Staff':
      return 7;
    case 'Scroll':
      return 6;
  }
}

export default saddlebagMagicItemSubtypeToBeyondSubtype;
