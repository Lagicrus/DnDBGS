import React from 'react';
import { getCurrentTab } from '../utils/utils';
import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';

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
  const magicItemForm = document.getElementById('magic-item-form');

  const magicItemName = document.getElementById('field-name');
  await fillInField(
    magicItemName as HTMLInputElement,
    params.magicItem.name || 'test'
  );

  const magicItemVersion = document.getElementById('field-version');
  await fillInField(magicItemVersion as HTMLInputElement, '5'); // 5 or 5e

  const magicItemRarity = document.getElementById('field-rarity');

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
