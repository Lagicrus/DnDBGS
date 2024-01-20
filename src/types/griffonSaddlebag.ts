// Type definitions for Griffon Saddlebag Internal API
export interface SaddlebagItem {
  attunement: boolean | string;
  bookAccessCodeGrant: string;
  dateDay: number;
  dateMonth: number;
  dateYear: number;
  description: string;
  flavour: string;
  free: boolean;
  id: string;
  imageIds: string[];
  itemSubtype: SaddlebagItemSubtypes;
  itemType: SaddlebagItemTypes;
  name: string;
  patreonArtUrl: string;
  patreonCardUrl: string;
  rarities: string[];
  rarity: SaddlebagItemRarity;
  significance: string;
  tags?: SaddlebagItemTag[];
}

// All of these types are taken from the Griffon Saddlebag API after finding all the possible options for each field
// For free users only. Will need to rerun with a paid account to get full coverage

// Tags for items
type SaddlebagItemTag =
  | 'consumable'
  | 'container'
  | 'accessory'
  | 'clothing'
  | 'outerwear'
  | 'cloak'
  | 'bracers';

// Rarity of items or combinations thereof
export type SaddlebagItemRarity =
  | 'very rare'
  | 'rare'
  | 'uncommon'
  | 'legendary'
  | 'common'
  | 'uncommon, rare (+1), or very rare (+2)'
  | 'rarity varies'
  | 'common (single use) or uncommon'
  | 'artifact'
  | 'uncommon or very rare'
  | 'common or rare';

// Primary types of items
export type SaddlebagItemTypes =
  | 'Weapon'
  | 'Armor'
  | 'Wondrous item'
  | 'Ring'
  | 'Rod'
  | 'Potion'
  | 'Wand'
  | 'Staff'
  | 'Scroll';

// Indicates what type of weapon, armour or combinations the item is
export type SaddlebagItemSubtypes =
  | 'maul'
  | 'longbow'
  | 'dagger and warhammer'
  | 'shield'
  | undefined
  | 'arrow'
  | 'halberd'
  | 'greataxe'
  | 'dagger and shortsword'
  | 'breastplate'
  | 'leather'
  | 'half plate'
  | 'any bow'
  | 'crossbow, heavy or light'
  | 'shortsword'
  | 'light'
  | 'longsword'
  | 'greatsword'
  | 'any slashing or piercing simple weapon'
  | 'war pick'
  | 'scimitar'
  | 'whip'
  | 'maul or warhammer'
  | 'spear'
  | 'any hammer'
  | 'mace'
  | 'padded or hide'
  | 'any axe'
  | 'shortbow'
  | 'dart'
  | 'arrow or bolt'
  | 'any bow or crossbow'
  | 'any sword'
  | 'greatclub'
  | 'quarterstaff'
  | 'dagger'
  | 'javelin or spear'
  | 'crossbow, hand'
  | 'flail'
  | 'quarterstaff or shortsword'
  | 'lance'
  | 'trident'
  | 'rapier'
  | 'club or greatclub'
  | 'leather or studded leather'
  | 'sling'
  | 'glaive'
  | 'rapier or shortsword'
  | 'crossbow, heavy'
  | 'longsword or rapier'
  | 'crossbow, light';

export type BonusModifierSubType =
  | 'attackDamage'
  | 'abilityChecks'
  | 'savingThrows'
  | 'ac'
  | 'spellAttackRolls'
  | 'spellSaveDC';

// Work in progress type definitions for Processed Descriptions to use in the future for Detail Form Entry
export interface SaddlebagItemDetails {
  bonuses?: {
    attackDamage?: number;
    abilityChecks?: number;
    savingThrows?: number;
    ac?: number;
    spellAttackRolls?: number;
    spellSaveDC?: number;
  };
}
