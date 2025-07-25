export default function KeywordForm({ value, onChange, onSubmit, loading }) {
  return (
    <div className="mt-6 flex justify-center gap-3">
      <input
        type="text"
        className="px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600
                   bg-white dark:bg-gray-800 focus:outline-none flex-1 max-w-md"
        placeholder="e.g. best running shoes"
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={onSubmit}
        disabled={loading}
        className="bg-accent text-white px-6 py-2 rounded-r-lg hover:bg-accent/90 disabled:opacity-50"
      >
        {loading ? '…' : 'Generate'}
      </button>
    </div>
  );
}
