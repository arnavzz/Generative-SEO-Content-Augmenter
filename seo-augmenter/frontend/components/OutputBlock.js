"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";

export default function OutputBlock({ html, sources }) {
  const [view, setView] = useState("preview"); // preview | html

  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Result</h2>
        <div className="space-x-2">
          <button
            onClick={() => setView("preview")}
            className={`px-3 py-1 rounded ${
              view === "preview" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setView("html")}
            className={`px-3 py-1 rounded ${
              view === "html" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            HTML
          </button>
        </div>
      </div>

      {view === "preview" ? (
        <div className="prose max-w-none bg-white p-6 rounded-lg shadow">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      ) : (
        <div className="relative">
          <CopyButton text={html} />
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
