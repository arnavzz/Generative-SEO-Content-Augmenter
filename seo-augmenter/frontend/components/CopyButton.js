"use client";

export default function CopyButton({ text }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button
      onClick={copy}
      className="ml-2 text-xs rounded bg-gray-200 hover:bg-gray-300 px-2 py-1"
    >
      Copy
    </button>
  );
}
