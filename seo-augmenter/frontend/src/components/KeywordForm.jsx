import { useState } from 'react';

export default function KeywordForm({ onSubmit, disabled }) {
  const [keyword, setKeyword] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!keyword.trim()) return;
        onSubmit(keyword.trim());
      }}
      className="w-full max-w-lg flex flex-col sm:flex-row gap-2"
    >
      <input
        type="text"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="eg: best running shoes"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {disabled ? '…' : 'Generate'}
      </button>
    </form>
  );
}
