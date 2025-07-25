import { useState, useEffect } from 'react';

// A simple batch fetch of OpenGraph + favicon data
async function fetchPreview(url) {
  try {
    const proxy = 'https://api.allorigins.win/raw?url=';
    const res = await fetch(proxy + encodeURIComponent(url));
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const title = doc.querySelector('meta[property="og:title"]')?.content || doc.title;
    const desc = doc.querySelector('meta[property="og:description"]')?.content || '';
    let img = doc.querySelector('meta[property="og:image"]')?.content || '';
    if (img && !img.startsWith('http')) img = new URL(url).origin + img;
    let fav = doc.querySelector('link[rel~="icon"]')?.href || new URL(url).origin + '/favicon.ico';
    const site = new URL(url).hostname.replace(/^www\./,'');
    return { url, title, description: desc, image: img, favicon: fav, site };
  } catch {
    const site = new URL(url).hostname.replace(/^www\./,'');
    return { url, title: site, description: '', image: '', favicon: '', site };
  }
}

export default function SourcesGrid({ urls }) {
  const [previews, setPreviews] = useState([]);
  useEffect(() => {
    Promise.all(urls.map(fetchPreview)).then(setPreviews);
  }, [urls]);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
      {previews.map((s, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow
                     hover:shadow-2xl transform hover:scale-105 transition"
        >
          {s.image && <img src={s.image} alt="" className="w-full h-32 object-cover" />}
          <div className="p-4">
            <div className="flex items-center mb-2">
              <img src={s.favicon} alt="" className="w-5 h-5 mr-2 rounded-sm" />
              <span className="text-sm text-gray-500 dark:text-gray-400">{s.site}</span>
            </div>
            <h3 className="font-semibold mb-1">{s.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">{s.description}</p>
            <a href={s.url} target="_blank" rel="noreferrer"
               className="text-primary hover:underline text-sm"
            >Read original</a>
          </div>
        </div>
      ))}
    </div>
  );
}
