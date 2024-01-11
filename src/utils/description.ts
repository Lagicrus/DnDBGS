export function typeDescription(description: string) {
  // iframe
  const magicItemDescriptionEditor = document.getElementById(
    'field-item-description-wysiwyg_ifr'
  ) as HTMLIFrameElement;

  const magicItemDescription =
    magicItemDescriptionEditor?.contentWindow?.document.getElementsByTagName(
      'body'
    );

  if (magicItemDescription) {
    if (magicItemDescription[0]) {
      const splitNewlines = description.split('\n\n');
      const splitNewlinesWithP = splitNewlines.map(line => `<p>${line}</p>`);
      const joinedNewlines = splitNewlinesWithP.join('');

      const italicized = joinedNewlines.replace(/\*(.*?)\*/g, '<em>$1</em>');

      const italicizedBold = italicized.replace(
        /\*\*\*(.*?)\*\*\*/g,
        '<em><strong>$1</strong></em>'
      );

      magicItemDescription[0].innerHTML = italicizedBold.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );
    }
  }
}
