import { useRef, useEffect } from 'react';

export default function SectionCard({ icon, title, children }) {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && ref.current.classList.add('opacity-100','translate-y-0'),
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-6 transition-all duration-500 
                 bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow 
                 hover:shadow-2xl transform hover:scale-105"
    >
      <h2 className="flex items-center text-2xl font-semibold mb-4">
        <span className="mr-2">{icon}</span>{title}
      </h2>
      <div className="prose dark:prose-invert text-justify">
        {children}
      </div>
    </div>
  );
}
