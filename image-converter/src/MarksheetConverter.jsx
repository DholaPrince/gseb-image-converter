import "./MarksheetConverter.css"
import SEO from "./SEO"

import { useState, useRef } from "react"

export default function MarksheetConverter({ onBack }) {
  const [image, setImage] = useState(null)
  const [convertedImage, setConvertedImage] = useState(null)
  const [error, setError] = useState("")
  const [warning, setWarning] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [fileSizeKB, setFileSizeKB] = useState(null)
  const [selectedFormat, setSelectedFormat] = useState("jpeg")
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.")
      return
    }
    setError("")
    setWarning("")
    const reader = new FileReader()
    reader.onload = (event) => setImage(event.target.result)
    reader.readAsDataURL(file)
  }

  // ... (Keep all your useState, useRef declarations, and handleImageUpload the same)

// *** MODIFIED FUNCTION ***
const compressMarksheet = (canvas) => {
  return new Promise((resolve) => {
    let quality = 0.8; // Start with a high quality, let the loop reduce it
    const MIN_KB = 5;
    const MAX_KB = 100;
    const MAX_QUALITY = 0.95;
    const MIN_QUALITY = 0.1;

    const compress = () => {
      // Convert canvas to Blob (JPEG) with current quality setting
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }

          const sizeKB = blob.size / 1024;

          // Target 5KB - 100KB range

          // 1. Oversized (Too Large) -> Decrease Quality
          if (sizeKB > MAX_KB && quality > MIN_QUALITY) {
            quality -= 0.05; // Drop quality aggressively
            // Prevent quality from dropping too low
            if (quality < MIN_QUALITY) quality = MIN_QUALITY;
            return compress();
          }

          // 2. Undersized (Too Small) -> Increase Quality
          // NOTE: This is often tricky, if the image is too simple, quality 1.0 might still be < 5KB.
          if (sizeKB < MIN_KB && quality < MAX_QUALITY) {
            quality += 0.03; // Increase quality slowly
            // Prevent quality from exceeding maximum
            if (quality > MAX_QUALITY) quality = MAX_QUALITY;
            return compress();
          }

          // 3. Perfect or Max/Min quality reached -> Resolve
          resolve(blob);
        },
        "image/jpeg",
        quality
      );
    };

    compress();
  });
};

// *** MODIFIED FUNCTION ***
const handleConvert = () => {
  if (!image) {
    setError("Please upload a marksheet image first!");
    return;
  }
  
  // Clear old warnings/errors
  setError("");
  setWarning("");

  setIsConverting(true);
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = image;
  img.onload = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Marksheet standard dimensions (A4 aspect ratio)
    const width = 800;
    const height = 1000;
    canvas.width = width;
    canvas.height = height;

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Center crop for marksheet (Logic remains the same for resizing/cropping)
    const imgAspect = img.width / img.height;
    const canvasAspect = width / height;

    let sx, sy, sWidth, sHeight;
    if (imgAspect > canvasAspect) {
      sHeight = img.height;
      sWidth = sHeight * canvasAspect;
      sx = (img.width - sWidth) / 2;
      sy = 0;
    } else {
      sWidth = img.width;
      sHeight = sWidth / canvasAspect;
      sx = 0;
      sy = (img.height - sHeight) / 2;
    }

    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);

    // *** CALLING THE NEW ITERATIVE COMPRESSION ***
    compressMarksheet(canvas).then((blob) => {
      if (!blob) {
        setError("Failed to compress marksheet");
        setIsConverting(false);
        return;
      }

      const finalSizeKB = Number.parseFloat((blob.size / 1024).toFixed(2));
      setFileSizeKB(finalSizeKB);
      setConvertedImage(URL.createObjectURL(blob));
      setIsConverting(false);

      // Update warnings based on the final compressed size
      if (finalSizeKB >= 5 && finalSizeKB <= 100) {
        setWarning("");
      } else if (finalSizeKB < 5) {
        setWarning("undersized");
      } else if (finalSizeKB > 100) {
        // This case should be rare, but possible if min_quality is too high or target size is aggressive
        setWarning("oversized");
      }
    });
  };
};

// ... (Keep the rest of your component logic the same, including handleDownload and the return block)

  const handleDownload = () => {
    if (selectedFormat === "pdf") {
      // Create PDF with JPEG embedded
      const canvas = canvasRef.current
      const imgData = canvas.toDataURL("image/jpeg", 0.65)

      // Dynamically import jsPDF to avoid ESM issues
      import("jspdf").then(({ jsPDF }) => {
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        })

        const imgWidth = 210 // A4 width in mm
        const imgHeight = (canvas.height / canvas.width) * imgWidth

        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight)
        pdf.save("marksheet-converted.pdf")
      })
    } else {
      // Download as JPEG
      const link = document.createElement("a")
      link.href = convertedImage
      link.download = "marksheet-converted.jpg"
      link.click()
    }
  }

  return (
    <>
    <SEO
            title="GSEB 10th/12th Marksheet Converter: Optimize Image for Board Form"
            description="Upload your 10th exam marksheet and convert it to an optimized format, ensuring it meets all size and file requirements for online board registration forms."
          />
    <div className="marksheet-page">
      <div className="marksheet-container">
        {/* Back Button */}
        {/* <button onClick={onBack} className="marksheet-back-btn">
          <svg className="marksheet-back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button> */}

        {/* Header */}
        <div className="marksheet-header">
          <h1 className="marksheet-title">📄 Marksheet Converter</h1>
          <p className="marksheet-tips">
            Upload your 10th exam marksheet and convert it to optimized format for board forms.
          </p>
        </div>

        {/* Upload Section */}
        <div className="marksheet-upload-wrapper">
          <label htmlFor="file-upload" className="marksheet-upload-area">
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="marksheet-file-input"
            />
            <svg className="marksheet-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="marksheet-upload-text">
              <span className="marksheet-upload-span-primary">Click to upload</span>
              <span className="marksheet-upload-span-secondary"> or drag and drop</span>
            </p>
            <p className="marksheet-upload-hint">PNG, JPG or PDF</p>
          </label>
        </div>

        {/* Preview Section */}
        {image && (
          <div className="marksheet-preview-wrapper">
            <p className="marksheet-preview-label">Original Preview</p>
            <div className="marksheet-preview-container">
              <img src={image || "/placeholder.svg"} alt="Original" className="marksheet-preview-image" />
            </div>
          </div>
        )}

        {/* Messages */}
        {error && <div className="marksheet-error-box">{error}</div>}
        {warning && <div className="marksheet-warning-box">{warning}</div>}

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={isConverting}
          className={`marksheet-convert-btn ${isConverting ? "marksheet-converting" : ""}`}
        >
          {isConverting ? "Converting..." : "Convert Now"}
        </button>

        {/* Result Section */}
        {convertedImage && (
          <div className="marksheet-result-wrapper">
            <p className="marksheet-result-label">Converted Preview</p>
            <div className="marksheet-result-container">
              <img src={convertedImage || "/placeholder.svg"} alt="Converted" className="marksheet-result-image" />
            </div>
            {fileSizeKB && (
              <div className="marksheet-file-info">
                <p
                  className={`marksheet-file-size ${
                    fileSizeKB >= 5 && fileSizeKB <= 100 ? "marksheet-size-perfect" : ""
                  } ${fileSizeKB < 5 ? "marksheet-size-undersized" : ""} ${
                    fileSizeKB > 100 ? "marksheet-size-oversized" : ""
                  }`}
                >
                  File Size: <strong>{fileSizeKB} KB</strong>
                </p>

                {fileSizeKB >= 5 && fileSizeKB <= 100 ? (
                  <div className="marksheet-suggestion marksheet-suggestion-perfect">
                    <p className="marksheet-suggestion-title">✓ Perfect!</p>
                    <p className="marksheet-suggestion-text">
                      This file size is perfect for board forms (5-100 KB). Ready to download!
                    </p>
                  </div>
                ) : fileSizeKB < 5 ? (
                  <div className="marksheet-suggestion marksheet-suggestion-undersized">
                    <p className="marksheet-suggestion-title">⚠️ File size too small ({fileSizeKB} KB)</p>
                    <p className="marksheet-suggestion-text">Try this simple fix:</p>
                    <ol className="marksheet-suggestion-steps">
                      <li>Download this image</li>
                      <li>Right-click on the downloaded image</li>
                      <li>Click "Properties"</li>
                      <li>Go to "Details" tab</li>
                      <li>Add 100-200 words in comments or any detail field</li>
                      <li>Click "OK"</li>
                      <li>Upload this modified image back here to convert again</li>
                    </ol>
                    <p className="marksheet-suggestion-text" style={{ marginTop: "12px", fontStyle: "italic" }}>
                      This adds metadata that increases file size without affecting the image quality! 😊
                    </p>
                  </div>
                ) : fileSizeKB > 100 ? (
                  <div className="marksheet-suggestion marksheet-suggestion-oversized">
                    <p className="marksheet-suggestion-title">⚠️ File size too large ({fileSizeKB} KB)</p>
                    <p className="marksheet-suggestion-text">
                      <strong>Solution:</strong> Download this image, then upload it back here and convert again. This
                      will compress it further to fit the 5-100 KB range.
                    </p>
                  </div>
                ) : null}
              </div>
            )}

            {/* Format Selection & Download */}
            <div className="marksheet-format-section">
              <p className="marksheet-format-label">Download Format:</p>
              <div className="marksheet-format-options">
                <label className="marksheet-format-option">
                  <input
                    type="radio"
                    value="jpeg"
                    checked={selectedFormat === "jpeg"}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                  />
                  <span className="marksheet-format-text">JPEG (Recommended)</span>
                </label>
                {/* <label className="marksheet-format-option">
                  <input
                    type="radio"
                    value="pdf"
                    checked={selectedFormat === "pdf"}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                  />
                  <span className="marksheet-format-text">PDF</span>
                </label> */}
              </div>
              {/* <p className="marksheet-format-note">
                Both formats maintain the same compression quality and file size (5-100 KB)
              </p> */}
            </div>

            <button onClick={handleDownload} className="marksheet-download-btn">
              ⬇️ Download {selectedFormat.toUpperCase()}
            </button>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
    </>
  )
}
