import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';
import { SaddlebagItemDetails } from '../types';

export default function calculateMagicItemDetails(
  magicItem: SaddlebagMagicItem
): SaddlebagItemDetails {
  const attackDamageBonusRegex =
    /You gain a \+(?<attackDamageBonus>\d) bonus to attack and damage/gm.exec(
      magicItem.description
    );
  const attackDamageBonus = attackDamageBonusRegex?.groups?.attackDamageBonus
    ? parseInt(attackDamageBonusRegex?.groups?.attackDamageBonus, 10)
    : 0;

  const abilityChecksSavingThrowsRegex =
    /You gain a \+(?<abilityChecksSavingThrows>\d) bonus to ability checks and saving throws/gm.exec(
      magicItem.description
    );
  const abilityChecksSavingThrows = abilityChecksSavingThrowsRegex?.groups
    ?.abilityChecksSavingThrows
    ? parseInt(
        abilityChecksSavingThrowsRegex?.groups?.abilityChecksSavingThrows,
        10
      )
    : 0;

  const acRegex = /You gain a \+(?<ac>\d) bonus to AC\./gm.exec(
    magicItem.description
  );
  const ac = acRegex?.groups?.ac ? parseInt(acRegex?.groups?.ac, 10) : 0;

  const spellAttackRollsSpellSaveDCRegex =
    /You gain a \+(?<spellAttackRollsSpellSaveDC>\d) bonus to spell attack rolls and spell save DC\./gm.exec(
      magicItem.description
    );
  const spellAttackRollsSpellSaveDC = spellAttackRollsSpellSaveDCRegex?.groups
    ?.spellAttackRollsSpellSaveDC
    ? parseInt(
        spellAttackRollsSpellSaveDCRegex?.groups?.spellAttackRollsSpellSaveDC,
        10
      )
    : 0;

  return {
    bonuses: {
      attackDamage: attackDamageBonus,
      abilityChecks: abilityChecksSavingThrows,
      savingThrows: abilityChecksSavingThrows,
      ac,
      spellAttackRolls: spellAttackRollsSpellSaveDC,
      spellSaveDC: spellAttackRollsSpellSaveDC
    }
  };
}
