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

      const italicizedBold = joinedNewlines.replace(
        /\*\*\*(.*?)\*\*\*/g,
        '<em><strong>$1</strong></em>'
      );

      const bold = italicizedBold.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );

      const italicized = bold.replace(/\*(.*?)\*/g, '<em>$1</em>');

      magicItemDescription[0].innerHTML = italicized;
    }
  }
}
