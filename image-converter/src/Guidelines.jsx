import "./Guidelines.css"
import { Link } from "react-router-dom";
import SEO from "./SEO";

export default function Guidelines() {
  return (
    <>
        <SEO
                title="How to Use GSEB Image Converter - Upload, Convert, Download Guidelines"
                description=" View the official guidelines and step-by-step instructions for using the GSEB Image Converter. Learn how to upload, optimize, and download your images correctly. "
              />
    <div className="guidelines-page">
      <div className="guidelines-container">
        <div className="guidelines-header">
          <h1 className="guidelines-title">
            How to Use <span className="guidelines-title-accent">GSEB Image Converter</span>
          </h1>
          <p className="guidelines-subtitle">
            Simple steps to convert your photographs and signatures for board forms
          </p>
        </div>

        {/* Quick Start */}
        <section className="guidelines-section">
          <h2 className="guidelines-section-title">🚀 Quick Start</h2>
          <p className="guidelines-section-description">
            Upload any size image or signature, and our converter automatically optimizes it to the perfect size for board forms.
          </p>
          <div className="guidelines-steps">
            <div className="guidelines-step">
              <div className="guidelines-step-number">1</div>
              <div className="guidelines-step-content">
                <h3>Choose Type</h3>
                <p>Select either Photograph or Signature mode</p>
              </div>
            </div>
            <div className="guidelines-step">
              <div className="guidelines-step-number">2</div>
              <div className="guidelines-step-content">
                <h3>Upload Image</h3>
                <p>Any size image works - just drag and drop</p>
              </div>
            </div>
            <div className="guidelines-step">
              <div className="guidelines-step-number">3</div>
              <div className="guidelines-step-content">
                <h3>Convert</h3>
                <p>Click Convert and we optimize automatically</p>
              </div>
            </div>
            <div className="guidelines-step">
              <div className="guidelines-step-number">4</div>
              <div className="guidelines-step-content">
                <h3>Download</h3>
                <p>Get your optimized image for board forms</p>
              </div>
            </div>
          </div>
        </section>

        {/* Output Specifications */}
        <section className="guidelines-section">
          <h2 className="guidelines-section-title">📏 Output Specifications</h2>
          <div className="guidelines-specs-grid">
            <div className="guidelines-spec-card">
              <div className="guidelines-spec-icon">📐</div>
              <h3>Dimensions</h3>
              <p>100 × 120 pixels</p>
              <span className="guidelines-spec-note">Perfect for board forms</span>
            </div>
            <div className="guidelines-spec-card">
              <div className="guidelines-spec-icon">💾</div>
              <h3>File Size</h3>
              <p>5 - 20 KB</p>
              <span className="guidelines-spec-note">Optimized for submission</span>
            </div>
            <div className="guidelines-spec-card">
              <div className="guidelines-spec-icon">🖼️</div>
              <h3>Format</h3>
              <p>JPEG</p>
              <span className="guidelines-spec-note">Compatible with all systems</span>
            </div>
            <div className="guidelines-spec-card">
              <div className="guidelines-spec-icon">✨</div>
              <h3>Quality</h3>
              <p>Auto-optimized</p>
              <span className="guidelines-spec-note">Best clarity at target size</span>
            </div>
          </div>
        </section>

        {/* Photograph Guidelines */}
        <section className="guidelines-section">
          <h2 className="guidelines-section-title">📸 Photograph Tips</h2>
          <div className="guidelines-tips-list">
            <div className="guidelines-tip-item">
              <span className="guidelines-tip-icon">✓</span>
              <div>
                <h4>Use Plain Background</h4>
                <p>White or light colored background works best</p>
              </div>
            </div>
            <div className="guidelines-tip-item">
              <span className="guidelines-tip-icon">✓</span>
              <div>
                <h4>Face Centered</h4>
                <p>Position your face in the center of the frame</p>
              </div>
            </div>
            <div className="guidelines-tip-item">
              <span className="guidelines-tip-icon">✓</span>
              <div>
                <h4>Good Lighting</h4>
                <p>Natural light preferred for clear details</p>
              </div>
            </div>
            <div className="guidelines-tip-item">
              <span className="guidelines-tip-icon">✓</span>
              <div>
                <h4>Clear Expression</h4>
                <p>Keep a neutral, natural expression</p>
              </div>
            </div>
          </div>
        </section>

        {/* Signature Guidelines */}
        <section className="guidelines-section">
          <h2 className="guidelines-section-title">✍️ Signature Tips</h2>
          <div className="guidelines-tips-list">
            <div className="guidelines-tip-item">
              <span className="guidelines-tip-icon">✓</span>
              <div>
                <h4>Black Ink Preferred</h4>
                <p>Use black or dark blue pen on white paper</p>
              </div>
            </div>
            <div className="guidelines-tip-item">
              <span className="guidelines-tip-icon">✓</span>
              <div>
                <h4>Scan Properly</h4>
                <p>High resolution scan or clear photo</p>
              </div>
            </div>
            <div className="guidelines-tip-item">
              <span className="guidelines-tip-icon">✓</span>
              <div>
                <h4>Full Signature</h4>
                <p>Include complete signature with flourishes</p>
              </div>
            </div>
            <div className="guidelines-tip-item">
              <span className="guidelines-tip-icon">✓</span>
              <div>
                <h4>Minimal Shadows</h4>
                <p>Avoid shadows or paper wrinkles in scan</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="guidelines-section">
          <h2 className="guidelines-section-title">❓ Frequently Asked Questions</h2>
          <div className="guidelines-faq">
            <div className="guidelines-faq-item">
              <h4>Can I upload any image size?</h4>
              <p>Yes! Our converter works with any size image. It will be automatically resized to 100×120 pixels.</p>
            </div>
            <div className="guidelines-faq-item">
              <h4>What if my file is too small or large?</h4>
              <p>Our intelligent compression ensures every converted image is between 5-20 KB, meeting all board form requirements.</p>
            </div>
            <div className="guidelines-faq-item">
              <h4>Will my signature be cut off?</h4>
              <p>No! Our signature mode preserves the entire signature with protective padding to retain all details and flourishes.</p>
            </div>
            <div className="guidelines-faq-item">
              <h4>Which format is supported?</h4>
              <p>PNG, JPG, and GIF formats are all supported for upload. Downloaded files are in JPEG format.</p>
            </div>
            <div className="guidelines-faq-item">
              <h4>Is my image private?</h4>
              <p>Yes! All conversions happen in your browser. Your images are never uploaded to any server.</p>
            </div>
          </div>
        </section>

        {/* Pro Tips & Tricks */}
        <section className="guidelines-section guidelines-pro-tips">
          <h2 className="guidelines-section-title">💡 Pro Tips & Tricks</h2>
          <div className="guidelines-pro-tip">
            <div className="guidelines-pro-tip-icon">😁</div>
            <div className="guidelines-pro-tip-content">
              <h4>The "Image Properties" Hack</h4>
              <p>
                If you ever get a file that's under 5KB (rare!), here's a funny trick from our users: You can add image title, 
                copyright, or camera info in the image properties before uploading to the board form. This embedded metadata 
                actually increases the file size! Some users have even added funny comments like "Best signature ever" 😄 to their 
                image metadata, which both adds size AND makes graders smile!
              </p>
            </div>
          </div>
          <div className="guidelines-pro-tip">
            <div className="guidelines-pro-tip-icon">🎯</div>
            <div className="guidelines-pro-tip-content">
              <h4>For Best Results</h4>
              <p>
                Upload high-quality source images (at least 500×600 pixels) for better detail retention. Our converter will 
                automatically optimize to 100×120 pixels and guarantee 5-20KB output every single time!
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="guidelines-cta">
          <h2>Ready to Convert?</h2>
          <p>Start converting your images and signatures now!</p>
          <Link to="/" className="guidelines-cta-button">
            Go to Converter →
          </Link>
        </section>
      </div>
    </div>
    </>
  )
}
