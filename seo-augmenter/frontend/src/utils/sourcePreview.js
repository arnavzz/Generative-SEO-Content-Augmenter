// src/utils/sourcePreview.js

export async function fetchPreviewData(url) {
  try {
    // Use AllOrigins CORS proxy to safely fetch page HTML
    const proxy = 'https://api.allorigins.win/raw?url=';
    const res = await fetch(proxy + encodeURIComponent(url));
    if (!res.ok) throw new Error();
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const getMeta = (sel, attr = 'content') => {
      const el = doc.querySelector(sel);
      return el?.getAttribute(attr) || '';
    };

    const title =
      getMeta('meta[property="og:title"]') ||
      doc.querySelector('title')?.innerText ||
      url;
    const description =
      getMeta('meta[property="og:description"]') ||
      getMeta('meta[name="description"]') ||
      '';
    // favicon
    let favicon = doc
      .querySelector('link[rel~="icon"]')
      ?.getAttribute('href') || '';
    if (favicon && !favicon.startsWith('http')) {
      const u = new URL(url);
      favicon = u.origin + favicon;
    }
    const siteName = new URL(url).hostname.replace(/^www\./, '');

    return { url, title, description, favicon, siteName };
  } catch {
    // fallback
    const siteName = new URL(url).hostname.replace(/^www\./, '');
    return { url, title: siteName, description: '', favicon: '', siteName };
  }
}
