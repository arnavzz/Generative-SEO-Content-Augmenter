import SectionCard from './SectionCard';

export default function TakeawaysSection({ html }) {
  return (
    <SectionCard icon="✅" title="Key Takeaways">
      <div
        className="text-justify prose dark:prose-invert space-y-3"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </SectionCard>
  );
}
