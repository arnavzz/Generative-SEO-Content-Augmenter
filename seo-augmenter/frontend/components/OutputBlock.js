"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";

export default function OutputBlock({ html, sources }) {
  const [tab, setTab] = useState("preview"); // preview | code

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Result</h2>
        <div className="space-x-2 text-sm">
          <button
            onClick={() => setTab("preview")}
            className={`px-3 py-1 rounded ${tab === "preview" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={`px-3 py-1 rounded ${tab === "code" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            HTML
          </button>
        </div>
      </div>

      {tab === "preview" && (
        <div className="prose max-w-none bg-white border border-gray-200 rounded p-6 overflow-auto">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}

      {tab === "code" && (
        <div className="relative">
          <CopyButton text={html} />
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-auto text-sm">{html}</pre>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Sources</h3>
        <ul className="list-disc ml-6 text-sm text-blue-600 break-all">
          {sources.map((s) => (
            <li key={s}>
              <a href={s} target="_blank" rel="noreferrer">{s}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
