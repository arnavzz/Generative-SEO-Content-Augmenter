import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.theme === 'dark' || false
  );
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.theme = dark ? 'dark' : 'light';
  }, [dark]);
  return (
    <button
      onClick={() => setDark(!dark)}
      className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-700 shadow"
    >
      {dark ? '🌞' : '🌙'}
    </button>
  );
}
