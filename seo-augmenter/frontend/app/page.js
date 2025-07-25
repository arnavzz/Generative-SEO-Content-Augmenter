"use client";

import { useState } from "react";
import KeywordForm from "../components/KeywordForm";
import OutputBlock from "../components/OutputBlock";

export default function Home() {
  const [html, setHtml] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async (keyword) => {
    setLoading(true);
    setError("");
    setHtml("");
    setSources([]);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/generate?keyword=${encodeURIComponent(
          keyword
        )}`
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
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
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">
        SEO Content Augmenter
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Keyword → FAQ / Myth vs Fact / Key Takeaways / JSON‑LD
      </p>

      <KeywordForm onGenerate={generate} loading={loading} />

      {loading && (
        <div className="mt-8 text-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-600 mx-auto"
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
          <p className="mt-2 text-blue-600">Generating content...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 text-red-600 text-center font-medium">
          {error}
        </div>
      )}

      {html && <OutputBlock html={html} sources={sources} />}
    </main>
  );
}
