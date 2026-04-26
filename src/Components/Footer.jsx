import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="ft">
      <div className="ft-glow" />

      <div className="ft-top">
        {/* Brand col */}
        <div className="ft-col ft-brand-col">
          <div className="ft-logo">🎓 Placement<strong>Pro</strong></div>
          <p className="ft-tagline">
            Empowering students to land their dream careers through smart preparation and guidance.
          </p>
          <div className="ft-socials">
            <a className="ft-social" href="#" title="LinkedIn">in</a>
            <a className="ft-social" href="#" title="Twitter">𝕏</a>
            <a className="ft-social" href="#" title="GitHub">⌥</a>
            <a className="ft-social" href="#" title="Instagram">◈</a>
          </div>
        </div>

        {/* Features col */}
        <div className="ft-col">
          <h4 className="ft-col-title">Features</h4>
          <ul className="ft-list">
            <li onClick={() => navigate("/upload")}>📄 Resume Upload</li>
            <li onClick={() => navigate("/prep")}>📚 Placement Prep</li>
            <li onClick={() => navigate("/mock")}>🎤 Mock Interview</li>
            <li onClick={() => navigate("/progress")}>📊 Progress Tracker</li>
            <li onClick={() => navigate("/career")}>🚀 Career Guidance</li>
            <li onClick={() => navigate("/community")}>👨🎓 Student Community</li>
          </ul>
        </div>

        {/* Resources col */}
        <div className="ft-col">
          <h4 className="ft-col-title">Resources</h4>
          <ul className="ft-list">
            <li onClick={() => navigate("/resources/interview-tips")}>📝 Interview Tips</li>
            <li onClick={() => navigate("/resources/aptitude")}>💡 Aptitude Practice</li>
            <li onClick={() => navigate("/resources/dsa")}>🧠 DSA Roadmap</li>
            <li onClick={() => navigate("/resources/companies")}>📖 Company Guides</li>
            <li onClick={() => navigate("/resources/faqs")}>🎯 Placement FAQs</li>
          </ul>
        </div>

        {/* Newsletter col */}
        <div className="ft-col ft-news-col">
          <h4 className="ft-col-title">Stay Updated</h4>
          <p className="ft-news-text">Get placement tips & job alerts directly in your inbox.</p>
          <div className="ft-news-form">
            <input className="ft-news-input" type="email" placeholder="your@email.com" />
            <button className="ft-news-btn">Subscribe</button>
          </div>
          <div className="ft-badges">
            <span className="ft-badge">🔒 No Spam</span>
            <span className="ft-badge">✅ Free Forever</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="ft-divider" />

     