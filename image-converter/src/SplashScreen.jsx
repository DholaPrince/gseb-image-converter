import { useEffect, useState } from "react"
import logo from "./assets/unnamed.jpg"
import "./SplashScreen.css"

export default function SplashScreen({ onFinish }) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Wait 2.5 seconds then start fade out
    const timer = setTimeout(() => {
      setIsExiting(true)
      // Complete exit after fade animation
      setTimeout(() => {
        onFinish()
      }, 500)
    }, 2500)

    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div className={`splash-screen ${isExiting ? "splash-exit" : ""}`}>
      <div className="splash-content">
        <img src={logo || "/placeholder.svg"} alt="School Logo" className="logo-animation" />
        <div className="splash-text">
          <h1 className="app-title">Image Converter</h1>
          <p className="app-subtitle">Convert & Transform Images</p>
        </div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}
