import { useNavigate } from "react-router-dom";
import "./Footer.css";

const QUICK_LINKS = [
  { label: "Home",           path: "/" },
  { label: "Dashboard",      path: "/dashboard" },
  { label: "Mock Interview", path: "/mock" },
  { label: "Resources",      path: "/resources" },
  { label: "Community",      path: "/community" },
];

const RESOURCE_LINKS = [
  { label: "Interview Tips",    path: "/resources/interview-tips" },
  { label: "DSA Roadmap",       path: "/resources/dsa" },
  { label: "Aptitude Practice", path: "/resources/aptitude" },
  { label: "Company Guides",    path: "/resources/companies" },
  { label: "Placement FAQs",    path: "/resources/faqs" },
];

const FOOTER_STATS = [
  { num: "500+", lbl: "Students" },
  { num: "50+",  lbl: "Companies" },
  { num: "6",    lbl: "Features" },
  { num: "100%", lbl: "Free" },
];

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="ft">
      <div className="ft-inner">
        <div className="ft-grid">

          {/* ── Brand ── */}
          <div className="ft-brand">
            <div className="ft-logo" onClick={() => navigate("/")}>
              🎓 Placement<strong>Pro</strong>
            </div>
            <p className="ft-tagline">
              Empowering students to land their dream careers through smart preparation, mock interviews, and a thriving community.
            </p>

            {/* Stats */}
            <div className="ft-stats">
              {FOOTER_STATS.map((s) => (
                <div key={s.lbl} className="ft-stat-item">
                  <span className="ft-stat-num">{s.num}</span>
                  <span className="ft-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="ft-socials">
              {[
                { label: "in", title: "LinkedIn"  },
                { label: "𝕏",  title: "Twitter"   },
                { label: "gh", title: "GitHub"    },
                { label: "ig", title: "Instagram" },
              ].map((s) => (
                <a key={s.title} className="ft-social" href="#" title={s.title}>{s.label}</a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="ft-col-title">Quick Links</h4>
            <ul className="ft-list">
              {QUICK_LINKS.map((l) => (
                <li key={l.path} onClick={() => navigate(l.path)}>{l.label}</li>
              ))}
            </ul>
          </div>

          {/* ── Resources ── */}
          <div>
            <h4 className="ft-col-title">Resources</h4>
            <ul className="ft-list">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.path} onClick={() => navigate(l.path)}>{l.label}</li>
              ))}
            </ul>
          </div>

          {/* ── Newsletter ── */}
          <div>
            <h4 className="ft-col-title">Stay Updated</h4>
            <p className="ft-news-desc">
              Get weekly placement tips, job alerts, and DSA challenges in your inbox.
            </p>
            <div className="ft-news-form">
              <input className="ft-news-input" type="email" placeholder="your@email.com" />
              <button className="ft-news-btn">Subscribe →</button>
            </div>
            <div className="ft-tags">
              <span className="ft-tag">🔒 No Spam</span>
              <span className="ft-tag">✅ Free Forever</span>
              <span className="ft-tag">🎯 Weekly Tips</span>
            </div>
          </div>

        </div>

        <div className="ft-divider" />

        <div className="ft-bottom">
          <div className="ft-copy">
            © {year} PlacementPro · Made with ❤️ for students
            <span className="ft-bottom-badge">🎓 Student First</span>
          </div>
          <div className="ft-links">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span onClick={() => navigate("/community")}>Contact Us</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
