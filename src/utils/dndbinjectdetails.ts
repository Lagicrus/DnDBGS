import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';
import calculateMagicItemDetails from './magicItemDetails';
import { anyKeysNotZero, detailsToOrderList, sleep } from './utils';
import { bonusModifierSubTypeToNumber } from './mappers/bonusModifierSubType';
import { BonusModifierSubType, SaddlebagItemDetails } from '../types';

type OrderStatus = 'started' | 'finished';

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

async function handleMainPage(params: { magicItem: SaddlebagMagicItem }) {
  const magicItemDetails = calculateMagicItemDetails(params.magicItem);
  const orders = await getOrders(magicItemDetails);
  const firstOrder = orders[0];

  if (!firstOrder) return;
  if (firstOrder.split('-')[0] !== 'bonuses') return;

  if (anyKeysNotZero(magicItemDetails.bonuses)) {
    const modifiersContainer = document.getElementById('modifiers');
    if (!modifiersContainer) return;
    const modifierButton = modifiersContainer.getElementsByClassName('button');
    if (!modifierButton || modifierButton.length === 0) return;
    window.location.href = modifierButton[0].getAttribute('href') || '';
  }
}

async function handleModifierPage(params: { orders: string[] }) {
  const orders = params.orders;
  if (!orders || orders.length === 0) return;

  const firstOrder = orders[0];
  const [type, key, value] = firstOrder.split('-');
  if (!type || !key || !value) return;

  if (type === 'bonuses') {
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
    // Purely visual
    (visualModifierType as HTMLSpanElement).innerText = 'Bonus';
    (jQModifierType as HTMLSelectElement).value = '1';
    jQModifierType.dispatchEvent(new Event('change', { bubbles: true }));
    await sleep(200);
    (jQModifierSubType as HTMLSelectElement).value =
      bonusModifierSubTypeToNumber(key as BonusModifierSubType) as string;
    jQModifierSubType.dispatchEvent(new Event('change', { bubbles: true }));
    await sleep(200);
    (fieldFixedValue as HTMLInputElement).value = value;
  }

  const saveButton = document.querySelector('button[type="submit"]');
  if (!saveButton) return;

  await chrome.storage.local.set({ orders: orders.slice(1) });

  (saveButton as HTMLButtonElement).click();
}

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
