import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';
import calculateMagicItemDetails from './magicItemDetails';
import { anyKeysNotZero, detailsToOrderList, sleep } from './utils';
import { bonusModifierSubTypeToNumber } from './mappers/bonusModifierSubType';
import { BonusModifierSubType, SaddlebagItemDetails } from '../types';

type OrderStatus = 'started' | 'finished';

// Set the order status to started if it hasn't been set yet and set orders for the first time
// If it has been set, return the current status
// If the status is finished, return an empty array
async function getOrderStatus(
  magicItemDetails: SaddlebagItemDetails
): Promise<OrderStatus> {
  const orderStatus = await chrome.storage.local.get('startedProcessingOrders');
  if (!orderStatus.startedProcessingOrders) {
    await chrome.storage.local.set({ startedProcessingOrders: 'started' });
    const orderList = detailsToOrderList(magicItemDetails);

    await chrome.storage.local.set({ orders: orderList });
    return 'started';
  }
  return orderStatus.startedProcessingOrders;
}

// Get the orders from storage
async function getOrders(magicItemDetails: SaddlebagItemDetails) {
  await getOrderStatus(magicItemDetails);
  const orderListSaved = await chrome.storage.local.get('orders');
  const extractedOrderList: string[] | [] = orderListSaved.orders || [];

  if (extractedOrderList.length === 0) {
    await chrome.storage.local.set({ startedProcessingOrders: 'finished' });
    return [];
  }
  return extractedOrderList;
}

// Handles filling out the details page
async function handleMainPage(params: { magicItem: SaddlebagMagicItem }) {
  const magicItemDetails = calculateMagicItemDetails(params.magicItem);
  const orders = await getOrders(magicItemDetails);
  const firstOrder = orders[0];

  // Meaning we have finished processing all orders
  if (!firstOrder) return;
  if (firstOrder.split('-')[0] !== 'bonuses') return;

  // If there are bonuses that are not 0, go to the modifiers page
  if (anyKeysNotZero(magicItemDetails.bonuses)) {
    const modifiersContainer = document.getElementById('modifiers');
    if (!modifiersContainer) return;
    const modifierButton = modifiersContainer.getElementsByClassName('button');
    if (!modifierButton || modifierButton.length === 0) return;
    // Goto modification page
    window.location.href = modifierButton[0].getAttribute('href') || '';
  }
}

// Handles filling out the modifier page
async function handleModifierPage(params: { orders: string[] }) {
  const orders = params.orders;
  if (!orders || orders.length === 0) return;

  const firstOrder = orders[0];
  // An order might look like this: bonuses-attackDamage-1
  const [type, key, value] = firstOrder.split('-');
  if (!type || !key || !value) return;

  if (type === 'bonuses') {
    // jQ variables are jQuery elements
    const jQModifierType = document.getElementById('field-spell-modifier-type');
    const visualModifierType = document.getElementById('select2-chosen-2');
    const jQModifierSubType = document.getElementById(
      'field-spell-modifier-sub-type'
    );
    const fieldFixedValue = document.getElementById('field-fixed-value');
    if (
      !jQModifierType ||
      !visualModifierType ||
      !jQModifierSubType ||
      !fieldFixedValue
    )
      return;
    // Purely visual to show the user what is going on before it is saved
    (visualModifierType as HTMLSpanElement).innerText = 'Bonus';
    // Set the variable then tell JQuery that we have done so
    (jQModifierType as HTMLSelectElement).value = '1';
    jQModifierType.dispatchEvent(new Event('change', { bubbles: true }));
    // Wait for the page to update, just in case
    await sleep(200);

    // Set the variable then tell JQuery that we have done so
    (jQModifierSubType as HTMLSelectElement).value =
      bonusModifierSubTypeToNumber(key as BonusModifierSubType) as string;
    jQModifierSubType.dispatchEvent(new Event('change', { bubbles: true }));
    // Wait for the page to update, just in case
    await sleep(200);
    (fieldFixedValue as HTMLInputElement).value = value;
  }

  const saveButton = document.querySelector('button[type="submit"]');
  if (!saveButton) return;

  // Update the orders to show we've processed the first one and remove it
  await chrome.storage.local.set({ orders: orders.slice(1) });

  (saveButton as HTMLButtonElement).click();
}

// If we are on the main page, start the full workflow
// If we are on the modifier page, continue the workflow
chrome.storage.local.get('item', async function (item) {
  if (
    window.location.href.match(
      /dndbeyond\.com\/homebrew\/creations\/magic-items\/\d+-.*\/edit/
    )
  ) {
    if (item.item) {
      await handleMainPage({ magicItem: item.item });
    }
  }

  if (
    window.location.href.match(
      /dndbeyond\.com\/modifier\/create\/\d{7}-\d{9}\/\d/
    )
  ) {
    chrome.storage.local.get('orders', async function (orders) {
      await handleModifierPage({ orders: orders.orders });
    });
  }
});
