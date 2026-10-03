export function Footer() {
  return (
    <section className="blitz-footer-shell" aria-label="Contact footer">
      <footer className="blitz-contact-footer">
        <div className="blitz-contact-footer-inner">
          <p className="blitz-contact-label">CONTACT</p>

          <div className="blitz-contact-grid">
            <div className="blitz-contact-item">
              <p className="blitz-contact-heading">Mail</p>
              <a href="mailto:hello@example.com">hello@example.com</a>
            </div>

            <div className="blitz-contact-item">
              <p className="blitz-contact-heading">Instagram</p>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">@blitz</a>
            </div>

            <div className="blitz-contact-item">
              <p className="blitz-contact-heading">Location</p>
              <a href="https://maps.google.com/?q=Keshav+Mahavidyalaya" target="_blank" rel="noreferrer">Keshav Mahavidyalaya</a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
