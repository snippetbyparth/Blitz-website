export function BlitzLogo() {
  return (
    <span className="blitz-logo" aria-label="BLITZ">
      <span className="blitz-logo-extrusion" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            className="blitz-logo-depth"
            style={{ '--depth-step': `${(index + 1) * 2}px` } as React.CSSProperties}
            key={index}
          >
            BLITZ
          </span>
        ))}
      </span>
      <span className="blitz-logo-front">BLITZ</span>
    </span>
  );
}