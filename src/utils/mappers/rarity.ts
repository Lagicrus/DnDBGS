import { SaddlebagItemRarity } from '../../types';

// Converts the string type for Rarity into the number user by D&D Beyond for the Select element
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

export default saddlebagRarityToBeyondRarity;
