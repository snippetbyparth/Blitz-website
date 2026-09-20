const departmentText = 'COMPUTER SCIENCE DEPARTMENT';

function MarqueeGroup() {
  return (
    <div className="marquee-group" aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => (
        <span className="marquee-text" key={index}>
          {departmentText}
        </span>
      ))}
    </div>
  );
}

export function DepartmentMarquee() {
  return (
    <div className="department-marquee" aria-label={departmentText}>
      <div className="marquee-line" />
      <div className="marquee-viewport">
        <div className="marquee-track">
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>
      <div className="marquee-line" />
    </div>
  );
}