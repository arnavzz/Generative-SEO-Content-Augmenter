"use client";

import { useState } from "react";
import KeywordForm from "../components/KeywordForm";
import OutputBlock from "../components/OutputBlock";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState("");
  const [sources, setSources] = useState([]);
  const [error, setError] = useState("");

  const handleGenerate = async (keyword) => {
    setLoading(true);
    setError("");
    setHtml("");
    setSources([]);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    try {
      const res = await fetch(`${API_URL}/generate?keyword=${encodeURIComponent(keyword)}`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setHtml(data.html || "");
      setSources(data.sources || []);
    } catch (e) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-2">Generative SEO Content Augmenter</h1>
      <p className="text-sm text-gray-500 mb-8">Keyword → FAQ, Myth vs Fact, Key Takeaways, JSON-LD</p>

      <KeywordForm onGenerate={handleGenerate} loading={loading} />

      {loading && (
        <div className="mt-8 animate-pulse text-gray-500">
          Generating unique sections...
        </div>
      )}

      {error && (
        <div className="mt-8 text-red-600 font-medium">
          {error}
        </div>
      )}

      {html && (
        <OutputBlock html={html} sources={sources} />
      )}
    </main>
  );
}
