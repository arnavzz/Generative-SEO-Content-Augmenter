import SectionCard from './SectionCard';

export default function FaqSection({ html }) {
  // Convert <ul> to <ol> for numbering, preserve children
  const numbered = html
    .replace(/<ul>/g, '<ol class="list-decimal list-inside space-y-2 mb-4">')
    .replace(/<\/ul>/g, '</ol>');
  return (
    <SectionCard icon="🧠" title="Frequently Asked Questions">
      <div
        className="text-justify prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: numbered }}
      />
    </SectionCard>
  );
}
