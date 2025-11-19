import "./ImageConverter.css";
import { useState, useRef } from "react"

export default function ImageConverter({ mode, onBack }) {
  const [image, setImage] = useState(null)
  const [convertedImage, setConvertedImage] = useState(null)
  const [error, setError] = useState("")
  const [warning, setWarning] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [fileSizeKB, setFileSizeKB] = useState(null)
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

  // New compression function that intelligently finds the right quality level
  const compressToTargetSize = (canvas) => {
    return new Promise((resolve) => {
      const minSize = 5 * 1024 // 5 KB
      const maxSize = 20 * 1024 // 20 KB
      
      // Binary search to find the right quality level
      let lowQuality = 0.01
      let highQuality = 1.0
      let bestBlob = null
      let bestQuality = 0.5

      const tryQuality = (quality) => {
        return new Promise((resolveQuality) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolveQuality(null)
                return
              }
              
              const sizeBytes = blob.size
              
              // If within target range, this is good
              if (sizeBytes >= minSize && sizeBytes <= maxSize) {
                bestBlob = blob
                bestQuality = quality
                resolveQuality(blob)
              } else {
                resolveQuality(null)
              }
            },
            "image/jpeg",
            quality
          )
        })
      }

      // First pass: try quality levels from high to low to find best fit
      const qualityLevels = []
      for (let i = 1.0; i >= 0.01; i -= 0.05) {
        qualityLevels.push(parseFloat(i.toFixed(2)))
      }

      let index = 0
      const tryNextQuality = async () => {
        if (index >= qualityLevels.length) {
          // If we found a good blob in target range, use it
          if (bestBlob) {
            resolve(bestBlob)
          } else {
            // Otherwise use the last attempted blob (closest to target)
            canvas.toBlob(
              (blob) => {
                resolve(blob)
              },
              "image/jpeg",
              bestQuality
            )
          }
          return
        }

        const result = await tryQuality(qualityLevels[index])
        if (result) {
          // Found a blob in target range, use it
          resolve(result)
          return
        }
        
        index++
        tryNextQuality()
      }

      tryNextQuality()
    })
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

      if (mode === "signature") {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, width, height)

        const padding = 5
        const availWidth = width - padding * 2
        const availHeight = height - padding * 2

        const imgAspect = img.width / img.height
        const availAspect = availWidth / availHeight

        let drawWidth, drawHeight
        if (imgAspect > availAspect) {
          drawWidth = availWidth
          drawHeight = availWidth / imgAspect
        } else {
          drawHeight = availHeight
          drawWidth = drawHeight * imgAspect
        }

        const x = (width - drawWidth) / 2
        const y = (height - drawHeight) / 2

        ctx.drawImage(img, x, y, drawWidth, drawHeight)
      } else {
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
      }

      compressToTargetSize(canvas).then((blob) => {
        if (!blob) {
          setError("Failed to compress image")
          setIsConverting(false)
          return
        }

        const finalSizeKB = (blob.size / 1024).toFixed(2)
        setFileSizeKB(finalSizeKB)
        setConvertedImage(URL.createObjectURL(blob))
        setIsConverting(false)
        setWarning("")
      })
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
            {fileSizeKB && (
              <p className="converter-file-size">
                ✓ File Size: <strong>{fileSizeKB} KB</strong> (Optimized for board forms)
              </p>
            )}
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
