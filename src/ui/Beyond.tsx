import React from 'react';
import { getCurrentTab } from '../utils/utils';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';
import { SaddlebagItemRarity } from '../types';

async function fillForm(params: { magicItem: SaddlebagMagicItem }) {
  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function fillInField(element: HTMLInputElement, text: string) {
    const splitText = text.split('');
    // Reset value
    element.value = '';

    for await (const char of splitText) {
      element.value += char;
      await sleep(randomIntFromInterval(50, 150));
    }
  }
  function saddlebagRarityToBeyondRarity(rarity: SaddlebagItemRarity) {
    switch (rarity) {
      case 'common':
        return 1;
      case 'uncommon':
        return 2;
      case 'rare':
        return 3;
      case 'very rare':
        return 4;
      case 'legendary':
        return 5;
      case 'artifact':
        return 7;
      case 'rarity varies':
        return 9;
      // TODO - handle these
      case 'uncommon, rare (+1), or very rare (+2)':
        return 0;
      case 'common (single use) or uncommon':
        return 0;
      case 'uncommon or very rare':
        return 0;
      case 'common or rare':
        return 0;
    }
  }
  async function selectRarity(
    element: HTMLSelectElement,
    rarity: SaddlebagItemRarity
  ) {
    const beyondRarity = saddlebagRarityToBeyondRarity(rarity);
    element.value = beyondRarity.toString();
  }
  const magicItemForm = document.getElementById('magic-item-form');

  const magicItemName = document.getElementById('field-name');
  await fillInField(
    magicItemName as HTMLInputElement,
    params.magicItem.name || 'test'
  );

  const magicItemVersion = document.getElementById('field-version');
  await fillInField(magicItemVersion as HTMLInputElement, '5'); // 5 or 5e

  const magicItemRarity = document.getElementById('field-rarity');
  await selectRarity(
    magicItemRarity as HTMLSelectElement,
    params.magicItem.rarity
  );

  return {
    success: true,
    name: document.querySelector('.saddlebag-item-card')?.textContent
  };
}

const Beyond = ({
  magicItem
}: {
  magicItem: SaddlebagMagicItem | undefined;
}) => {
  const onClick = async () => {
    const currentTab = await getCurrentTab();
    if (!currentTab) return;
    console.log('clicked');
    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id as number },
      func: fillForm,
      args: [{ magicItem: magicItem as SaddlebagMagicItem }] // arguments must be JSON-serializable
    });
    // res[0] contains results for the main page of the tab
    // document.body.textContent = JSON.stringify(res[0].result);
  };

  if (!magicItem)
    return <p>Select a magic item first from Griffons Saddlebag</p>;

  return <button onClick={onClick}>Fill in form</button>;
};

export default Beyond;
