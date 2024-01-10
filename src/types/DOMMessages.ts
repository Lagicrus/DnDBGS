import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';

export type DOMMessage = {
  type: 'GET_DOM';
};

export type DOMMessageResponse = SaddlebagMagicItem | boolean;
