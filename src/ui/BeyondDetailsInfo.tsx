import React, { useEffect } from 'react';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';
import { SaddlebagItemDetails } from '../types';
import calculateMagicItemDetails from '../utils/magicItemDetails';

/*
  Handles displaying the processed description details of a Magic Item
 */
export default function BeyondDetailsInfo({
  toggleShowOtherDetails,
  magicItem
}: {
  toggleShowOtherDetails: () => void;
  magicItem: SaddlebagMagicItem | undefined;
}) {
  const [magicItemDetails, setMagicItemDetails] = React.useState<
    SaddlebagItemDetails | undefined
  >(undefined);
  if (!magicItem) {
    return (
      <div>
        <p>Select a magic item first from Griffon&apos;s Saddlebag</p>
        <button onClick={toggleShowOtherDetails}>ℹ️</button>
      </div>
    );
  }

  // On page load, calculate the magic item details
  useEffect(() => {
    if (!magicItem) return;
    if (!magicItemDetails) {
      setMagicItemDetails(calculateMagicItemDetails(magicItem));
    }
  }, []);

  return (
    <div>
      <div className="otherDetailsContainer">
        <p>Loaded Magic Item: {magicItem?.name}</p>
        <button onClick={toggleShowOtherDetails}>ℹ️</button>
      </div>
      <div>
        <p>Bonuses:</p>
        <p>
          {magicItemDetails?.bonuses
            ? `Attack&Damage: ${magicItemDetails.bonuses.attackDamage}`
            : 'No bonuses found'}
        </p>
      </div>
    </div>
  );
}
