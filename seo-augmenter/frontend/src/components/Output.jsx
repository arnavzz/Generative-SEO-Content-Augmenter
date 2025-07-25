import { useState } from 'react';

export default function Output({ html, sources }) {
  const [tab, setTab] = useState('preview');

  const copy = () => navigator.clipboard.writeText(html);

  return (
    <section className="w-full max-w-3xl mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Result</h2>
        <div className="space-x-2">
          <button
            onClick={() => setTab('preview')}
            className={`px-3 py-1 rounded ${
              tab === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setTab('html')}
            className={`px-3 py-1 rounded ${
              tab === 'html' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            HTML
          </button>
        </div>
      </div>

      {tab === 'preview' ? (
        <div className="prose bg-white p-6 rounded-lg shadow">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={copy}
            className="absolute top-2 right-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
          >
            Copy
          </button>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {html}
          </pre>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Sources</h3>
        <ul className="list-disc list-inside text-blue-600">
          {sources.map((url) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
