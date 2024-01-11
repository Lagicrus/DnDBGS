import { SaddlebagItemSubtypes } from '../../types';

function saddlebagArmorSubtypeToBeyondSubtype(itemType: SaddlebagItemSubtypes) {
  // TODO if we can't find the armor type, alert the user to flag this item on Github
  // TODO add test that all armor types are handled
  switch (itemType) {
    case 'breastplate':
      return 13;
    // case 'chain shirt':
    //   return 12;
    // case 'chain mail':
    //   return 16;
    case 'half plate':
      return 14;
    case 'padded or hide':
      return 9; // TODO currently padded, what about hide?
    case 'light': // Is this correct?
    case 'leather or studded leather':
      return 0; // TODO currently leather, what about studded leather?
    case 'leather':
      return 10;
    // case 'plate':
    //   return 18;
    // case 'pride silk outfit':
    //   return 20;
    // case 'ring mail':
    //   return 15;
    // case 'scale mail':
    //   return 6;
    case 'shield':
      return 8;
    // case 'spiked armor':
    //   return 19;
    // case 'splint':
    //   return 17;
    // case 'studded leather':
    //   return 3;
    case undefined:
    default:
      return 0; // No subtype
  }
}

export default saddlebagArmorSubtypeToBeyondSubtype;
