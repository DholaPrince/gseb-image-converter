import "./LandingPage.css";

export default function LandingPage({ onSelect }) {
  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        {/* Header Section */}
        <div className="landing-header">
          <div className="landing-icon">
            <svg className="landing-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="landing-title">
            GSEB Image <span className="landing-title-accent">Converter</span>
          </h1>
          <p className="landing-subtitle">Prepare your documents for submission. Fast, easy, and built for students.</p>
        </div>

        {/* Selection Cards */}
        <div className="landing-grid">
          {/* Photograph Card */}
          <button onClick={() => onSelect("photo")} className="landing-card landing-card-photo">
            <div className="landing-card-gradient"></div>
            <div className="landing-card-content">
              <div className="landing-card-emoji">📸</div>
              <h2 className="landing-card-title">Photograph</h2>
              <p className="landing-card-description">Convert your passport photo or portrait to the required size</p>
              <div className="landing-card-link">
                Get started
                <svg className="landing-card-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          {/* Signature Card */}
          <button onClick={() => onSelect("signature")} className="landing-card landing-card-signature">
            <div className="landing-card-gradient"></div>
            <div className="landing-card-content">
              <div className="landing-card-emoji">✍️</div>
              <h2 className="landing-card-title">Signature</h2>
              <p className="landing-card-description">Convert your scanned signature to the correct format</p>
              <div className="landing-card-link">
                Get started
                <svg className="landing-card-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Info Section */}
        <div className="landing-info">
          <p className="landing-info-label">Why students love this tool</p>
          <div className="landing-info-grid">
            <div className="landing-info-item">
              <p className="landing-info-value">100%</p>
              <p className="landing-info-text">Free to use</p>
            </div>
            <div className="landing-info-item">
              <p className="landing-info-value">1 min</p>
              <p className="landing-info-text">Super fast</p>
            </div>
            <div className="landing-info-item">
              <p className="landing-info-value">100%</p>
              <p className="landing-info-text">Secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
