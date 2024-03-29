import React, { useEffect } from 'react';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';
import { getSettings } from '../utils/utils';

/*
  Shows the basic information about the magic item
  Including optional rendering of the image based on user settings
 */
export default function MagicItem({
  saddlebagItem
}: {
  saddlebagItem: SaddlebagMagicItem | undefined;
}) {
  const [hideImage, setHideImage] = React.useState(false);

  // On page load check if the user has the setting to hide images
  useEffect(() => {
    getSettings().then(options => {
      setHideImage(!options.showMagicItemImages);
    });
  }, []);

  if (!saddlebagItem) {
    return <p>Select a magic item first from Griffon&apos;s Saddlebag</p>;
  }

  return (
    <>
      {!hideImage && saddlebagItem?.base64Image && (
        <img id="magic-item" src={saddlebagItem.base64Image} alt="Magic Item" />
      )}
      <p>Loaded Magic Item: {saddlebagItem?.name}</p>
    </>
  );
}
