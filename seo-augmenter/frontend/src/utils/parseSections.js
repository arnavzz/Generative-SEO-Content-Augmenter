// Splits the raw HTML on <h2> tags into independent sections
export function parseSections(rawHtml) {
  const doc = new DOMParser().parseFromString(rawHtml, 'text/html');
  const headings = Array.from(doc.querySelectorAll('h2'));
  return headings.map((h) => {
    let sib = h.nextSibling;
    let content = '';
    while (sib && !(sib.nodeType === 1 && sib.tagName === 'H2')) {
      content += sib.outerHTML || sib.textContent;
      sib = sib.nextSibling;
    }
    return {
      title: h.textContent.trim(),
      content: content.trim(),
    };
  });
}
