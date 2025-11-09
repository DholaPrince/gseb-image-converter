import "./ImageConverter.css";

import { useState, useRef } from "react"

export default function ImageConverter({ mode, onBack }) {
  const [image, setImage] = useState(null)
  const [convertedImage, setConvertedImage] = useState(null)
  const [error, setError] = useState("")
  const [warning, setWarning] = useState("")
  const [isConverting, setIsConverting] = useState(false)
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

  const handleConvert = () => {
    if (!image) {
      setError("Please upload an image first!")
      return
    }
    setIsConverting(true)
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = image
    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      const width = 100
      const height = 120
      canvas.width = width
      canvas.height = height

      const imgAspect = img.width / img.height
      const targetAspect = width / height

      let sx, sy, sWidth, sHeight
      if (imgAspect > targetAspect) {
        sHeight = img.height
        sWidth = sHeight * targetAspect
        sx = (img.width - sWidth) / 2
        sy = 0
      } else {
        sWidth = img.width
        sHeight = sWidth / targetAspect
        sx = 0
        sy = (img.height - sHeight) / 2
      }

      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height)

      let quality = 0.9
      const tryCompress = () => {
        canvas.toBlob(
          (b) => {
            if (!b) return
            const sizeKB = b.size / 1024
            if (sizeKB > 20 && quality > 0.2) {
              quality -= 0.1
              tryCompress()
            } else if (sizeKB < 5 && quality < 1) {
              quality += 0.05
              tryCompress()
            } else {
              if (sizeKB < 5) setWarning("⚠️ Image size is very small (<5KB).")
              if (sizeKB > 20) setWarning("⚠️ Image size is large (>20KB).")
              setConvertedImage(URL.createObjectURL(b))
              setIsConverting(false)
            }
          },
          "image/jpeg",
          quality,
        )
      }
      tryCompress()
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = convertedImage
    link.download = `converted-${mode}-100x120.jpg`
    link.click()
  }

  const accentClass = mode === "photo" ? "photo" : "signature"

  return (
    <div className={`converter-page converter-${accentClass}`}>
      <div className="converter-container">
        {/* Back Button */}
        <button onClick={onBack} className="converter-back-btn">
          <svg className="converter-back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="converter-header">
          <h1 className="converter-title">{mode === "photo" ? "📸 Photograph" : "✍️ Signature"} Converter</h1>
          <p className="converter-tips">
            {mode === "photo" ? "Use plain background, face centered." : "Use black ink signature, scan properly."}
          </p>
        </div>

        {/* Upload Section */}
        <div className="converter-upload-wrapper">
          <label htmlFor="file-upload" className={`converter-upload-area converter-upload-${accentClass}`}>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="converter-file-input"
            />
            <svg className="converter-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="converter-upload-text">
              <span className={`converter-upload-span-primary converter-upload-span-${accentClass}`}>
                Click to upload
              </span>
              <span className="converter-upload-span-secondary"> or drag and drop</span>
            </p>
            <p className="converter-upload-hint">PNG, JPG or GIF</p>
          </label>
        </div>

        {/* Preview Section */}
        {image && (
          <div className="converter-preview-wrapper">
            <p className="converter-preview-label">Original Preview</p>
            <div className="converter-preview-container">
              <img src={image || "/placeholder.svg"} alt="Original" className="converter-preview-image" />
            </div>
          </div>
        )}

        {/* Messages */}
        {error && <div className="converter-error-box">{error}</div>}
        {warning && <div className="converter-warning-box">{warning}</div>}

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={isConverting}
          className={`converter-convert-btn converter-convert-${accentClass} ${
            isConverting ? "converter-converting" : ""
          }`}
        >
          {isConverting ? "Converting..." : "Convert Now"}
        </button>

        {/* Result Section */}
        {convertedImage && (
          <div className="converter-result-wrapper">
            <p className="converter-result-label">Converted Preview (100×120)</p>
            <div className="converter-result-container">
              <img src={convertedImage || "/placeholder.svg"} alt="Converted" className="converter-result-image" />
            </div>
            <button onClick={handleDownload} className={`converter-download-btn converter-download-${accentClass}`}>
              ⬇️ Download Image
            </button>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  )
}
