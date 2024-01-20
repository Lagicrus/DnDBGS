import React, { useEffect } from 'react';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';
import { SaddlebagItemDetails } from '../types';
import calculateMagicItemDetails from '../utils/magicItemDetails';

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
            ? `Attack: ${magicItemDetails.bonuses.attack} - Damage: ${magicItemDetails.bonuses.damage}`
            : 'No bonuses found'}
        </p>
      </div>
    </div>
  );
}
