export default function HeroSection() {
  return (
    <div className="hero-wrapper">
      <main className="hero-main">
        <section className="hero" aria-labelledby="hero-title">
          <picture>
            <img 
              className="hero-media" 
              src="image.webp" 
              alt="Axelrod hero background" 
            />
          </picture>
          
          <div className="hero-scrim"></div>
          
          <div className="hero-content">
            <h1 id="hero-title" className="hero-title rise rise-1">
              The operating<br/>layer for<br/>boutique hotels
            </h1>
            <p className="hero-copy rise rise-2">
              Axelrod runs the daily operations of hotels and resorts, from boutique to luxury, inside the systems and teams already in place.
            </p>
            <div className="hero-foot rise rise-3">
              <button type="button" className="hero-cta" data-overlay="signup">
                See where Axelrod starts <span className="cta-arrow">&rarr;</span>
              </button>
              <p className="hero-cred">
                Powering <strong>Michelin Key</strong> awarded and <strong>Marriott Luxury Collection</strong> properties
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Hero Brand Logo Strip */}
      <div className="hero-brand-strip">
        <p className="hero-brand-label">Trusted by 500+ Hotels, Resorts &amp; Restaurants across India</p>
        <div className="hero-brand-track-wrapper">
          <div className="hero-brand-track">
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b73896845431756838038.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b7388e511791756838030.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b738864e55e1756838022.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b73873d9d4c1756838003.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b7386ab942e1756837994.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b73864706f21756837988.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b7385e7f1601756837982.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b738594c7391756837977.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b73853631b71756837971.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b7384a75ece1756837962.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b7389f5ce1d1756838047.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b738d4ef8d41756838100.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b738b1e31241756838065.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b738c0232dc1756838080.png" alt="brand logo" loading="lazy" /></div>
            {/* Duplicate for seamless loop */}
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b73896845431756838038.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b7388e511791756838030.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b738864e55e1756838022.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b73873d9d4c1756838003.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b7386ab942e1756837994.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b73864706f21756837988.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b7385e7f1601756837982.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b738594c7391756837977.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b73853631b71756837971.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b7384a75ece1756837962.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b7389f5ce1d1756838047.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b738d4ef8d41756838100.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b738b1e31241756838065.png" alt="brand logo" loading="lazy" /></div>
            <div className="hero-brand-item"><img src="https://pixelgo.live/assets/images/frontend/brand/68b738c0232dc1756838080.png" alt="brand logo" loading="lazy" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
