"use client"

import { useState, useEffect } from "react"
import "../components/AnimatedTutorial.css"

export default function AnimatedTutorial() {
  const [currentStep, setCurrentStep] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 4000)

    return () => clearTimeout(timer)
  }, [currentStep, autoPlay])

  const steps = [
    {
      title: "Upload Your File",
      description: "Click to select and upload your image, signature, or marksheet",
      icon: "📤",
      animation: "step-upload",
      details: ["Drag & drop or click to browse", "Supports JPG, PNG formats"],
    },
    {
      title: "Select Conversion Type",
      description: "Choose what you want to convert: Photo, Signature, or Marksheet",
      icon: "⚙️",
      animation: "step-select",
      details: [
        "Photo: Optimized size 100×120",
        "Signature: Detects and fits perfectly",
        "Marksheet: Larger canvas for documents",
      ],
    },
    {
      title: "Instant Conversion",
      description: "Our AI automatically converts and compresses your file",
      icon: "✨",
      animation: "step-convert",
      details: ["Automatic size optimization", "Maintains quality while reducing file size"],
    },
    {
      title: "Download Your File",
      description: "Get your converted file in JPEG or PDF format (for marksheets)",
      icon: "💾",
      animation: "step-download",
      details: ["Check file size (5-20KB for photos/signatures)", "Ready for board forms and submissions"],
    },
    {
      title: "Draw Your Signature",
      description: "Don't have a signature? Draw one directly on our platform!",
      icon: "✍️",
      animation: "step-draw",
      details: ["Easy drawing canvas", "Multiple color options", "Download instantly"],
    },
  ]

  const nextStep = () => {
    setAutoPlay(false)
    setCurrentStep((prev) => (prev + 1) % steps.length)
  }

  const prevStep = () => {
    setAutoPlay(false)
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)
  }

  const goToStep = (index) => {
    setAutoPlay(false)
    setCurrentStep(index)
  }

  return (
    <div className="animated-tutorial">
      {/* Header */}
      <div className="tutorial-header">
        <h2>How to Use GSEB Image Converter</h2>
        <p>Follow these simple steps to convert your files perfectly</p>
      </div>

      {/* Animation Container */}
      <div className="tutorial-animation-container">
        <div className={`tutorial-step-animation ${steps[currentStep].animation} active`}>
          <div className="animation-icon">{steps[currentStep].icon}</div>
          <div className="animation-content">
            <h3>{steps[currentStep].title}</h3>
            <p>{steps[currentStep].description}</p>
            <ul className="animation-details">
              {steps[currentStep].details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="tutorial-progress">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`progress-dot ${currentStep === index ? "active" : ""}`}
            onClick={() => goToStep(index)}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>

      {/* Step Counter */}
      <div className="tutorial-counter">
        <span>
          {currentStep + 1} / {steps.length}
        </span>
      </div>

      {/* Navigation Buttons */}
      <div className="tutorial-controls">
        <button
          className="control-btn prev-btn"
          onClick={prevStep}
          aria-label="Previous step"
          disabled={currentStep === 0}
        >
          ← Back
        </button>

        <button
          className="control-btn auto-play-btn"
          onClick={() => setAutoPlay(!autoPlay)}
          aria-label="Toggle auto-play"
        >
          {autoPlay ? "⏸ Pause" : "▶ Play"}
        </button>

        <button
          className="control-btn next-btn"
          onClick={nextStep}
          aria-label="Next step"
          disabled={currentStep === steps.length - 1}
        >
          Next →
        </button>
      </div>

      {/* Quick Tips */}
      <div className="tutorial-tips">
        <h4>Quick Tips</h4>
        <ul>
          <li>File sizes should be between 5-20KB for photos and signatures</li>
          <li>Use our Signature Drawer if you don't have a signature yet</li>
          <li>Marksheets can be up to 100KB for better document quality</li>
          <li>Always check file size before submitting to board forms</li>
        </ul>
      </div>
    </div>
  )
}
