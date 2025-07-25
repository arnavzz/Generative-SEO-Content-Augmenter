"use client";

export default function CopyButton({ text }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
    >
      Copy
    </button>
  );
}
