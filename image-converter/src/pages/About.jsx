import "../pages/ab.css";
import SEO from "../SEO";

export default function About() {
  return (
    <>
    <SEO
        title="About Us - GSEB Image Converter"
        description="Learn more about GSEB Image Converter, a free online tool that helps you easily resize and convert your photo or signature for GSEB forms."
      />
    <div className="about-page-container">
      <div className="about-page-content">
        {/* Header Section */}
        <div className="about-header">
          <h1 className="about-title">
            About <span className="about-title-accent">Us</span>
          </h1>
          <p className="about-subtitle">
            Helping students and schools simplify document preparation with fast, secure, and easy-to-use tools.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="about-section">
          <div className="about-section-header">
            <h2 className="about-section-title">What We Do</h2>
          </div>
          <p className="about-section-text">
            GSEB Image Converter is a specialized tool designed for students and educational institutions across
            Gujarat. We understand the challenges of preparing documents for board examinations and official
            submissions. Our mission is to make this process simple, fast, and accessible to everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="about-features-grid">
          <div className="about-feature-card">
            <div className="about-feature-icon">🎯</div>
            <h3 className="about-feature-title">Fast & Reliable</h3>
            <p className="about-feature-description">Convert your documents instantly with our optimized processing</p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">🔒</div>
            <h3 className="about-feature-title">100% Secure</h3>
            <p className="about-feature-description">
              Your files are processed locally and never stored on our servers
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">📱</div>
            <h3 className="about-feature-title">Mobile Friendly</h3>
            <p className="about-feature-description">Works perfectly on phones, tablets, and desktops</p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">💯</div>
            <h3 className="about-feature-title">Completely Free</h3>
            <p className="about-feature-description">No registration, no hidden charges, no limitations</p>
          </div>
        </div>

        {/* Story Section */}
        <div className="about-section">
          <div className="about-section-header">
            <h2 className="about-section-title">Our Story</h2>
          </div>
          <p className="about-section-text">
            We created this tool because we know how frustrating it can be to prepare multiple versions of your photos
            and signatures for different forms and applications. What started as a simple converter has grown into a
            trusted platform used by thousands of students across Gujarat. We're committed to keeping it free and
            continuously improving it based on your feedback.
          </p>
        </div>

        {/* Values Section */}
        <div className="about-values-section">
          <h2 className="about-values-title">Our Values</h2>
          <div className="about-values-list">
            <div className="about-value-item">
              <h3 className="about-value-name">Simplicity</h3>
              <p className="about-value-desc">Easy to use for everyone, no technical knowledge required</p>
            </div>
            <div className="about-value-item">
              <h3 className="about-value-name">Privacy</h3>
              <p className="about-value-desc">Your data stays yours—we never collect or store your files</p>
            </div>
            <div className="about-value-item">
              <h3 className="about-value-name">Accessibility</h3>
              <p className="about-value-desc">Free and available to every student who needs it</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
