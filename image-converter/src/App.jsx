import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import ImageConverter from "./ImageConverter";
import SEO from "./SEO";
import SplashScreen from "./SplashScreen";
import About from "./pages/About"
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
import Guidelines from "./Guidelines";
import FloatingGuidelineButton from "./FloatingGuidelineButton";
import MarksheetConverter from "./MarksheetConverter";
// import SignatureDrawer from "./SignatureDrawer";

export default function App() {
  const [mode, setMode] = useState(null); // Photo or Signature mode
  const [showSplash, setShowSplash] = useState(true); // Show splash screen initially

  // Handle user selecting Photo / Signature
  const handleSelect = (selectedMode) => setMode(selectedMode);

  // Back button from converter to landing
  const handleBack = () => setMode(null);

  // Splash finished → show landing page
  const handleSplashFinish = () => setShowSplash(false);

  // Dynamic SEO based on mode
  const seoTitle =
    mode === "photo"
      ? "Photograph Converter - GSEB Form Image"
      : mode === "signature"
      ? "Signature Converter - GSEB Form Image"
      : "GSEB Image Converter - Resize Photo & Signature";

  const seoDescription =
    mode === "photo"
      ? "Convert your photograph to 100x120px JPEG for GSEB board forms easily."
      : mode === "signature"
      ? "Convert your signature to 100x120px JPEG for GSEB board forms easily."
      : "Convert your photograph or signature to the required 100x120px JPEG for GSEB board forms quickly and easily.";

  return (
   <BrowserRouter>
      {/* SEO */}
      <SEO title={seoTitle} description={seoDescription} />
<ScrollToTop/>
      {/* Splash Screen */}
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
                {mode ? (
                  <ImageConverter mode={mode} onBack={handleBack} />
                ) : (
                  <LandingPage onSelect={handleSelect} />
                )}
              </main>
            }
          />
          {/* Example static pages routing */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/marksheet" element={<MarksheetConverter />} />
          {/* <Route path="/SignatureDrawer" element={<SignatureDrawer />} /> */}
        </Routes>
      )}
      <FloatingGuidelineButton/>
       <Footer />
    </BrowserRouter>
  );
}
