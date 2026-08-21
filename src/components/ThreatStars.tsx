interface Props {
  level: number;
  max?: number;
  size?: number;
}

export default function ThreatStars({ level, max = 5, size = 14 }: Props) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px', alignItems: 'center' }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 1L8.545 5.09H13L9.527 7.41L10.91 11.5L7 9.09L3.09 11.5L4.473 7.41L1 5.09H5.455Z"
            fill={i < level ? '#b8852a' : 'transparent'}
            stroke={i < level ? '#b8852a' : '#5a4e3a'}
            strokeWidth="1"
          />
        </svg>
      ))}
    </span>
  );
}
