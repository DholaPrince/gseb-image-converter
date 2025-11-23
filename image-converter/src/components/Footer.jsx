// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../components/Footer.css";
import logo from "../assets/unnamed.jpg"
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
     <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <img src={logo} alt="GSEB Image Converter Logo" className="footer-logo-img" />
          <p className="footer-text">Convert your images and Signature smartly using this tool.</p>
        </div>

        {/* Center Section - Quick Links */}
        <div className="footer-center">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
             <li>
              <Link to="/marksheet">Convert Marksheet!</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
            <li>
              <Link to="/guidelines">Guidelines</Link>
            </li>
             {/* <li>
              <Link to="/SignatureDrawer">Draw a Signature</Link>
            </li> */}
          </ul>
        </div>

        {/* Right Section - Contact / Social */}
        <div className="footer-right">
          <h3>Contact Us</h3>
          {/* <p>Email: support@aiconverter.com</p> */}
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook"><FaFacebookF /></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"><FaTwitter /></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"><FaInstagram /></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GSEB Image Converter. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
