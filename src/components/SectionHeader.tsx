interface SectionHeaderProps {
  index: number;
  title: string;
  isActive?: boolean;
}

export default function SectionHeader({ index, title, isActive = false }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: isActive ? '#b8852a' : '#5a4e3a', textTransform: 'uppercase', marginBottom: '0.4rem', transition: 'color 0.3s' }}>
        Chapter {index + 1}
      </p>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.3rem', fontWeight: 600, color: isActive ? '#ddd0b8' : '#9a8d7a', letterSpacing: '0.04em', lineHeight: 1.3, transition: 'color 0.3s' }}>
        {title}
      </h2>
    </div>
  );
}
