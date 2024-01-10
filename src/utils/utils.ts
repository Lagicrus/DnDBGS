export async function getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  return tab ?? undefined;
}
