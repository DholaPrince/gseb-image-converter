import "../pages/pr.css";
import SEO from "../SEO";

export default function Privacy() {
  return (
    <><SEO
        title="Privacy Policy - GSEB Image Converter"
        description="Read how GSEB Image Converter handles and protects your privacy and data security while using our website."
      />
    <div className="privacy-page-container">
      <div className="privacy-page-content">
        {/* Header Section */}
        <div className="privacy-header">
          <h1 className="privacy-title">
            Privacy <span className="privacy-title-accent">Policy</span>
          </h1>
          <p className="privacy-subtitle">
            Your privacy and data security are our top priorities. Learn how we protect your information.
          </p>
        </div>

        {/* Main Privacy Section */}
        <div className="privacy-section">
          <div className="privacy-section-header">
            <h2 className="privacy-section-title">Data Protection</h2>
          </div>
          <p className="privacy-section-text">
            We do not store any user data on our servers. All image conversions are processed locally in your browser.
            Your uploaded images and files are never transmitted to or stored on our infrastructure, ensuring 100%
            privacy and complete control over your sensitive data.
          </p>
        </div>

        {/* Privacy Features Grid */}
        <div className="privacy-features-grid">
          <div className="privacy-feature-card">
            <div className="privacy-feature-icon">🔐</div>
            <h3 className="privacy-feature-title">No Server Storage</h3>
            <p className="privacy-feature-description">
              All processing happens in your browser - nothing is saved on our servers
            </p>
          </div>

          <div className="privacy-feature-card">
            <div className="privacy-feature-icon">🚫</div>
            <h3 className="privacy-feature-title">No Data Collection</h3>
            <p className="privacy-feature-description">
              We do not collect, track, or analyze your personal information
            </p>
          </div>

          <div className="privacy-feature-card">
            <div className="privacy-feature-icon">🔍</div>
            <h3 className="privacy-feature-title">No Tracking</h3>
            <p className="privacy-feature-description">
              No cookies, analytics, or third-party tracking of your activity
            </p>
          </div>

          <div className="privacy-feature-card">
            <div className="privacy-feature-icon">✅</div>
            <h3 className="privacy-feature-title">Full Control</h3>
            <p className="privacy-feature-description">
              You have complete control over your files and when they are deleted
            </p>
          </div>
        </div>

        {/* Detailed Privacy Section */}
        <div className="privacy-section">
          <div className="privacy-section-header">
            <h2 className="privacy-section-title">Your Privacy Rights</h2>
          </div>
          <p className="privacy-section-text">
            As a user of GSEB Image Converter, you retain all rights to your data. We never sell, share, or use your
            information for any purpose other than providing the service. Your files are cleared from your browser's
            memory as soon as you refresh or close the page.
          </p>
        </div>

        {/* Privacy Standards Section */}
        <div className="privacy-standards-section">
          <h2 className="privacy-standards-title">Our Privacy Standards</h2>
          <div className="privacy-standards-list">
            <div className="privacy-standard-item">
              <h3 className="privacy-standard-name">Transparent</h3>
              <p className="privacy-standard-desc">
                We're clear about how we operate - no hidden policies or fine print
              </p>
            </div>
            <div className="privacy-standard-item">
              <h3 className="privacy-standard-name">Secure</h3>
              <p className="privacy-standard-desc">
                Your data is protected with modern security practices and encryption
              </p>
            </div>
            <div className="privacy-standard-item">
              <h3 className="privacy-standard-name">Compliant</h3>
              <p className="privacy-standard-desc">We comply with international privacy regulations and standards</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="privacy-section privacy-contact-section">
          <div className="privacy-section-header">
            <h2 className="privacy-section-title">Questions?</h2>
          </div>
          <p className="privacy-section-text">
            If you have any questions about our privacy policy or how we handle your data, please feel free to reach out
            to us. We're here to help and ensure you have complete peace of mind.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
