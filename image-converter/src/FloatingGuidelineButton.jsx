import { useState } from 'react'
// import Guidelines from './Guidelines'
import AnimatedTutorial from './components/AnimatedTutorial'
import './FloatingGuidelineButton.css'

export default function FloatingGuidelineButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button 
        className="floating-button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Guidelines"
        title="Click for Guidelines"
      >
        <span className="floating-button-ai">AI</span>
        <div className="floating-button-glow"></div>
        <div className="floating-button-pulse"></div>
      </button>

      {/* Guidelines Modal */}
      {isOpen && (
        <div className="guidelines-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="guidelines-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="guidelines-modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close Guidelines"
            >
              ✕
            </button>
            <AnimatedTutorial />
          </div>
        </div>
      )}
    </>
  )
}
