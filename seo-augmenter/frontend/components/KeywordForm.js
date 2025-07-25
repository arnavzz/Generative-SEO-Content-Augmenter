"use client";

import { useState } from "react";

export default function KeywordForm({ onGenerate, loading }) {
  const [keyword, setKeyword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!keyword.trim()) return;
        onGenerate(keyword.trim());
      }}
      className="flex flex-col sm:flex-row gap-2"
    >
      <input
        type="text"
        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="Enter keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "…" : "Generate"}
      </button>
    </form>
  );
}
