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
      className="flex gap-2"
    >
      <input
        className="flex-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter keyword (e.g., best running shoes)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="rounded bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "..." : "Generate"}
      </button>
    </form>
  );
}
