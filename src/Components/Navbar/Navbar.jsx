import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";

const features = [
  { label: "Resume Upload",         path: "/upload",    icon: "📄" },
  { label: "Placement Preparation", path: "/prep",      icon: "📚" },
  { label: "Mock Interview",        path: "/mock",      icon: "🎤" },
  { label: "Progress Tracker",      path: "/progress",  icon: "📊" },
  { label: "Career Guidance",       path: "/career",    icon: "🚀" },
  { label: "Student Community",     path: "/community", icon: "👨🎓" },
];

const resourceLinks = [
  { label: "Interview Tips",    path: "/resources/interview-tips", icon: "📝" },
  { label: "Aptitude Practice", path: "/resources/aptitude",       icon: "💡" },
  { label: "DSA Roadmap",       path: "/resources/dsa",            icon: "🧠" },
  { label: "Company Guides",    path: "/resources/companies",      icon: "📖" },
  { label: "Placement FAQs",    path: "/resources/faqs",           icon: "🎯" },
];

const Chevron = ({ open }) => (
  <svg className={`nb-chevron ${open ? "nb-chevron-open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Navbar = ({ form, onLogout, onProfileClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null); // "feat" | "res" | "user" | null
  const navRef = useRef(null);

  const toggle = (name) => setOpenMenu(prev => prev === name ? null : name);
  const close  = ()     => setOpenMenu(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on route change — compare previous pathname via state
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setOpenMenu(null); 
  }

  const { theme, toggleTheme } = useTheme();
  const initials  = form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const isActive  = (path) => location.pathname === path;
  const anyActive = (list) => list.some(f => isActive(f.path));

  const go = (path) => { close(); navigate(path); };

  return (
    <nav className="nb" ref={navRef}>

      {/* ── Brand ── */}
      <div className="nb-brand" onClick={() => go("/home")}>
        <span className="nb-brand-icon">🎓</span>
        <span className="nb-brand-text">Placement<strong>Pro</strong></span>
      </div>

      {/* ── Nav Links ── */}
      <div className="nb-links">

        <button className={`nb-link ${isActive("/home") ? "nb-link-active" : ""}`} onClick={() => go("/home")}>
          🏠 Home
        </button>

        <button className={`nb-link ${isActive("/profile") ? "nb-link-active" : ""}`} onClick={() => { close(); onProfileClick(); }}>
          👤 Profile
        </button>

        {/* ── Features Dropdown ── */}
        <div className="nb-drop-wrap">
          <button
            className={`nb-link nb-drop-btn ${anyActive(features) ? "nb-link-active" : ""} ${openMenu === "feat" ? "nb-link-active" : ""}`}
            onClick={() => toggle("feat")}
          >
            ⚡ Features <Chevron open={openMenu === "feat"} />
          </button>

          {openMenu === "feat" && (
            <div className="nb-dropdown">
              <p className="nb-drop-heading">Placement Tools</p>
              <div className="nb-drop-grid">
                {features.map((f) => (
                  <button
                    key={f.path}
                    className={`nb-drop-item ${isActive(f.path) ? "nb-drop-item-active" : ""}`}
                    onClick={() => go(f.path)}
                  >
                    <span className="nb-drop-icon">{f.icon}</span>
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Resources Dropdown ── */}
        <div className="nb-drop-wrap">
          <button
            className={`nb-link nb-drop-btn ${(isActive("/resources") || anyActive(resourceLinks)) ? "nb-link-active" : ""} ${openMenu === "res" ? "nb-link-active" : ""}`}
            onClick={() => toggle("res")}
          >
            📚 Resources <Chevron open={openMenu === "res"} />
          </button>

          {openMenu === "res" && (
            <div className="nb-dropdown nb-dropdown-res">
              <p className="nb-drop-heading">Learning Resources</p>
              <button className="nb-res-all" onClick={() => go("/resources")}>
                📂 View All Resources →
              </button>
              <div className="nb-drop-col">
                {resourceLinks.map((r) => (
                  <button
                    key={r.path}
                    className={`nb-drop-item nb-drop-item-full ${isActive(r.path) ? "nb-drop-item-active" : ""}`}
                    onClick={() => go(r.path)}
                  >
                    <span className="nb-drop-icon">{r.icon}</span>
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ── Right ── */}
      <div className="nb-right">

        <div className="nb-bell" title="Notifications">
          🔔<span className="nb-bell-dot" />
        </div>

        {/* Theme Toggle */}
        <button className="nb-theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* ── User Dropdown ── */}
        <div className="nb-user-wrap">
          <div className="nb-user" onClick={() => toggle("user")}>
            <div className="nb-avatar">{initials}</div>
            <div className="nb-user-info">
              <span className="nb-user-name">{form.name}</span>
              <span className="nb-user-role">{form.branch} · {form.year}</span>
            </div>
            <Chevron open={openMenu === "user"} />
          </div>

          {openMenu === "user" && (
            <div className="nb-user-menu">
              <div className="nb-user-menu-header">
                <div className="nb-avatar nb-avatar-lg">{initials}</div>
                <div>
                  <p className="nb-um-name">{form.name}</p>
                  <p className="nb-um-branch">{form.branch} · {form.year}</p>
                </div>
              </div>
              <hr className="nb-um-divider" />
              <button className="nb-um-item" onClick={() => { close(); onProfileClick(); }}>👤 View Profile</button>
              <button className="nb-um-item" onClick={() => go("/resources")}>📚 Resources</button>
              <button className="nb-um-item" onClick={() => go("/progress")}>📊 My Progress</button>
              <hr className="nb-um-divider" />
              <button className="nb-um-item nb-um-logout" onClick={() => { close(); onLogout(); }}>🚪 Logout</button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
