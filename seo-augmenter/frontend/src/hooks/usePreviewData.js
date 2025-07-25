export async function fetchPreview(url) {
  try {
    const proxy = 'https://api.allorigins.win/raw?url=';
    const res = await fetch(proxy + encodeURIComponent(url));
    if (!res.ok) throw new Error();
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const title = doc.querySelector('meta[property="og:title"]')?.content
      || doc.querySelector('title')?.innerText
      || url;
    const desc = doc.querySelector('meta[property="og:description"]')?.content
      || doc.querySelector('meta[name="description"]')?.content
      || '';
    let img = doc.querySelector('meta[property="og:image"]')?.content || '';
    if (img && !img.startsWith('http')) {
      const u = new URL(url);
      img = u.origin + img;
    }
    let fav = doc.querySelector('link[rel~="icon"]')?.href || '';
    if (fav && !fav.startsWith('http')) {
      const u = new URL(url);
      fav = u.origin + fav;
    }
    const site = new URL(url).hostname.replace(/^www\./, '');
    return { url, title, description: desc, image: img, favicon: fav, site };
  } catch {
    const site = new URL(url).hostname.replace(/^www\./, '');
    return { url, title: site, description: '', image: '', favicon: '', site };
  }
}
