export async function getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  return tab ?? undefined;
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fillInField(element: HTMLInputElement, text: string) {
  const splitText = text.split('');
  // Reset value
  element.value = '';

  for await (const char of splitText) {
    element.value += char;
    await sleep(randomIntFromInterval(50, 150));
  }
}
