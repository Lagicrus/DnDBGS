import { SaddlebagItem } from '../types';

export type SaddlebagMagicItem = {
  name: string;
  version: string;
  rarity: string;
  baseItemType: string;
  magicItemType: string;
  attunement: boolean | string;
  attunementDescription: string;
  description: string;
};

export const magicItemCreator = (item: SaddlebagItem): SaddlebagMagicItem => {
  return {
    name: item.name,
    version: '5e',
    rarity: item.rarity,
    baseItemType: 'Item',
    magicItemType: item.itemType,
    attunement: item.attunement,
    attunementDescription: item.attunement.toString().includes(' by a')
      ? (item.attunement as string)
      : '',
    description: item.description
  };
};
