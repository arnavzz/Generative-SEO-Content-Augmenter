import { useState } from 'react';
import KeywordForm from './components/KeywordForm';
import FaqSection from './components/FaqSection';
import MythFactSection from './components/MythFactSection';
import TakeawaysSection from './components/TakeawaysSection';
import SourcesGrid from './components/SourcesGrid';
import { parseSections } from './utils/parseSections';
import aiAnalysis from '../images/ai-analysis.png'
<img src={aiAnalysis} alt="AI Analysis" />

import contentElements from '../images/content-elements.png'
<img src={contentElements} alt="Content Elements" />
import mythVsFact from '../images/myth-vs-fact.png'


<img src={mythVsFact} alt="Myth vs Fact" />

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [sections, setSections] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setError('');
    setSections([]);
    setSources([]);
    try {
      const res = await fetch(
        `http://localhost:8000/generate?keyword=${encodeURIComponent(keyword)}`
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const { html, sources } = await res.json();
      setSections(parseSections(html));
      setSources(sources || []);
    } catch (e) {
      setError(e.message || 'Fetch failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="p-8 text-center">
        <h1 className="text-4xl font-bold text-primary">SEO Content Augmenter</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Enter a keyword to generate FAQ, Myth vs Fact, Key Takeaways & Sources
        </p>
        <KeywordForm
          value={keyword}
          onChange={setKeyword}
          onSubmit={generate}
          loading={loading}
        />
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-12">
        {sections.map((sec, idx) => {
          const t = sec.title.toLowerCase();
          if (t.includes('faq')) {
            return <FaqSection key="faq" html={sec.content} />;
          }
          if (t.includes('myth')) {
            return <MythFactSection key="myth" html={sec.content} />;
          }
          if (t.includes('takeaway')) {
            return <TakeawaysSection key="takeaway" html={sec.content} />;
          }
          return null;
        })}

        {sources.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
              <span className="mr-2">🔗</span> Sources
            </h2>
            <SourcesGrid urls={sources} />
          </>
        )}
      </main>
    </div>
  );
}
