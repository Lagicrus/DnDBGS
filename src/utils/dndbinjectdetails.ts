import { SaddlebagMagicItem } from '../chromeServices/DnDBeyond';

async function fillDetails(params: { magicItem: SaddlebagMagicItem }) {
  return;
}

chrome.storage.local.get('item', async function (item) {
  if (
    !window.location.href.includes(
      'dndbeyond.com/homebrew/creations/create-magic-item/create'
    )
  )
    return;
  if (item.item) {
    await fillDetails({ magicItem: item.item });
  }
});
