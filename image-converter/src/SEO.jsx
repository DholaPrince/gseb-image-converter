import React from "react";
import { Helmet } from "react-helmet";

export default function SEO({ title, description, url, image }) {
  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title || "GSEB Image Converter"}</title>
      <meta name="description" content={description || "Convert your photo/signature to 100x120px JPEG for GSEB forms easily."} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph / Social Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || "GSEB Image Converter"} />
      <meta property="og:description" content={description || "Convert your photo/signature to 100x120px JPEG for GSEB forms easily."} />
      <meta property="og:url" content={url || window.location.href} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "GSEB Image Converter"} />
      <meta name="twitter:description" content={description || "Convert your photo/signature to 100x120px JPEG for GSEB forms easily."} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
}
