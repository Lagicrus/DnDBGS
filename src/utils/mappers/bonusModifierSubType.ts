import { BonusModifierSubType } from '../../types';

export function bonusModifierSubTypeToNumber(subType: BonusModifierSubType) {
  switch (subType) {
    case 'attackDamage':
      return '312'; // Melee weapon attacks
    case 'abilityChecks':
      break;
    case 'savingThrows':
      break;
    case 'ac':
      break;
    case 'spellAttackRolls':
      break;
    case 'spellSaveDC':
      break;
  }
}
