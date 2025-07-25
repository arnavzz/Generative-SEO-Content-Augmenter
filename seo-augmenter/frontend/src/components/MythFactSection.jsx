import SectionCard from './SectionCard';

export default function MythFactSection({ html }) {
  // Expect backend HTML to include <table>…</table>
  return (
    <SectionCard icon="⚖️" title="Myth vs Fact">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse table-alt">
          <tbody dangerouslySetInnerHTML={{ __html: html }} />
        </table>
      </div>
    </SectionCard>
  );
}
