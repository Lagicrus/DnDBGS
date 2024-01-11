import React from 'react';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';

export default function MagicItem({
  saddlebagItem
}: {
  saddlebagItem: SaddlebagMagicItem | undefined;
}) {
  if (!saddlebagItem) {
    return <p>Select a magic item first from Griffon&apos;s Saddlebag</p>;
  }

  return (
    <>
      {saddlebagItem?.base64Image && (
        <img id="magic-item" src={saddlebagItem.base64Image} alt="Magic Item" />
      )}
      <p>Loaded Magic Item: {saddlebagItem?.name}</p>
    </>
  );
}
