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

type SaddlebagItemTag =
  | 'consumable'
  | 'container'
  | 'accessory'
  | 'clothing'
  | 'outerwear'
  | 'cloak'
  | 'bracers';

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
