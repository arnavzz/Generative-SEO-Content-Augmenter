// src/components/SourcePreviewList.jsx
import { useEffect, useState } from 'react';
import { fetchPreviewData } from '../utils/sourcePreview';

export default function SourcePreviewList({ urls }) {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const data = await Promise.all(urls.map(fetchPreviewData));
      if (alive) {
        setPreviews(data);
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [urls]);

  if (loading) {
    return <p className="text-gray-500">Loading source previews…</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {previews.map((p, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-lg p-4 transform transition
                     hover:shadow-2xl hover:scale-[1.02]"
        >
          <div className="flex items-center mb-2">
            {p.favicon && (
              <img
                src={p.favicon}
                alt=""
                className="h-6 w-6 mr-2 rounded"
              />
            )}
            <span className="text-sm font-medium text-gray-600">
              {p.siteName}
            </span>
          </div>
          <h4 className="font-semibold text-lg mb-1">
            {p.title}
          </h4>
          <p className="text-sm text-gray-700 mb-3 max-h-12 overflow-hidden">
            {p.description}
          </p>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Read original
          </a>
        </div>
      ))}
    </div>
  );
}
