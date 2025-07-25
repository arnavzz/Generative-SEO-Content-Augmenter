import { useState } from 'react';
import KeywordForm from "./components/KeywordForm";
import Output      from "./components/Output";

export default function App() {
  const [html, setHtml] = useState('');
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async (keyword) => {
    setLoading(true);
    setError('');
    setHtml('');
    setSources([]);

    try {
      const res = await fetch(
        `http://localhost:8000/generate?keyword=${encodeURIComponent(keyword)}`
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setHtml(data.html || '');
      setSources(data.sources || []);
    } catch (e) {
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">SEO Content Augmenter</h1>
      <p className="text-gray-600 mb-8">
        Enter a keyword to generate FAQ, Myth vs Fact & Key Takeaways
      </p>

      <KeywordForm onSubmit={generate} disabled={loading} />

      {loading && (
        <div className="mt-8 flex flex-col items-center text-blue-600">
          <svg
            className="animate-spin h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span className="mt-2">Generating content...</span>
        </div>
      )}

      {error && (
        <div className="mt-8 text-red-600 font-medium">
          {error}
        </div>
      )}

      {html && <Output html={html} sources={sources} />}
    </div>
  );
}
