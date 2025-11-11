import "../pages/co.css";
import SEO from "../SEO";

export default function Contact() {
  return (
    <>
    <SEO
        title="Contact Us - GSEB Image Converter"
        description="Have questions or suggestions? Contact GSEB Image Converter for support and feedback."
      />
    <div className="contact-page-container">
      <div className="contact-page-content">
        <div className="contact-header">
          <h1 className="contact-title">
            Get in <span className="contact-title-accent">Touch</span>
          </h1>
          <p className="contact-subtitle">
            Have questions or feedback? We'd love to hear from you. Reach out to us anytime!
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-card-icon">📧</div>
            <h3 className="contact-card-title">Email Us</h3>
            <p className="contact-card-description">Send us your queries or feedback</p>
            <a href="mailto:yourmail@example.com" className="contact-link">
              yourmail@example.com
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">⏱️</div>
            <h3 className="contact-card-title">Response Time</h3>
            <p className="contact-card-description">We typically respond within 24 hours</p>
            <span className="contact-badge">Quick Support</span>
          </div>
        </div>

        <div className="contact-info-section">
          <h2 className="contact-info-title">Why Contact Us?</h2>
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <div className="contact-info-icon">🎓</div>
              <h4 className="contact-info-label">For Students</h4>
              <p className="contact-info-text">Get help with image conversion tools and features</p>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">🏫</div>
              <h4 className="contact-info-label">For Schools</h4>
              <p className="contact-info-text">Institutional support and bulk inquiries</p>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">💬</div>
              <h4 className="contact-info-label">General Feedback</h4>
              <p className="contact-info-text">Share your suggestions to improve our platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
