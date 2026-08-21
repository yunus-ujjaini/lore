const ROMAN_numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];

interface SectionHeaderProps {
  index: number;
  title: string;
}

export default function SectionHeader({ index, title }: SectionHeaderProps) {
  const numeral = ROMAN_numerals[index] || String(index + 1);

  return (
    <div className="section-header">
      <span className="section-header__numeral" aria-hidden="true">{numeral}</span>
      <h2 className="section-header__title">{title}</h2>
      <div className="section-header__divider">
        <span className="section-header__diamond" />
      </div>
    </div>
  );
}
