import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";

const NAV_FEATURES = [
  { label: "Resume Upload",    path: "/upload",    icon: "📄" },
  { label: "Placement Prep",   path: "/prep",      icon: "📚" },
  { label: "Mock Interview",   path: "/mock",      icon: "🎤" },
  { label: "Progress Tracker", path: "/progress",  icon: "📊" },
  { label: "Career Guidance",  path: "/career",    icon: "🚀" },
  { label: "Community",        path: "/community", icon: "👥" },
];

const NAV_RESOURCES = [
  { label: "Interview Tips",    path: "/resources/interview-tips", icon: "📝" },
  { label: "Aptitude Practice", path: "/resources/aptitude",       icon: "💡" },
  { label: "DSA Roadmap",       path: "/resources/dsa",            icon: "🧠" },
  { label: "Company Guides",    path: "/resources/companies",      icon: "🏢" },
  { label: "Placement FAQs",    path: "/resources/faqs",           icon: "❓" },
];

const ChevronIcon = ({ open }) => (
  <svg
    className={`nb-chevron ${open ? "nb-chevron-open" : ""}`}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Navbar({ form, onLogout, onProfileClick }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const navRef    = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const [open, setOpen]       = useState(null); // "feat" | "res" | "user" | null
  const [prevPath, setPrevPath] = useState(location.pathname);

  /* close on route change */
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setOpen(null);
  }

  /* close on outside click */
  useEffect(() => {
    const h = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpen(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const go      = (path) => { setOpen(null); navigate(path); };
  const toggle  = (name) => setOpen((p) => (p === name ? null : name));
  const isActive = (path) => location.pathname === path;
  const anyActive = (list) => list.some((f) => isActive(f.path));

  const initials = form
    ? form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "";

  return (
    <nav className="nb" ref={navRef}>

      {/* ── Logo ── */}
      <div className="nb-logo" onClick={() => go(form ? "/dashboard" : "/")}>
        <span className="nb-logo-icon">🎓</span>
        <span className="nb-logo-text">Placement<strong>Pro</strong></span>
      </div>

      {/* ── Center Links ── */}
      <div className="nb-center">

        <button
          className={`nb-link ${isActive("/home") || isActive("/") ? "nb-link-active" : ""}`}
          onClick={() => go("/")}
        >
          Home
        </button>

        {/* Features dropdown */}
        <div className="nb-drop-wrap">
          <button
            className={`nb-link ${anyActive(NAV_FEATURES) || open === "feat" ? "nb-link-active" : ""}`}
            onClick={() => toggle("feat")}
          >
            Features <ChevronIcon open={open === "feat"} />
          </button>
          {open === "feat" && (
            <div className="nb-dropdown">
              <p className="nb-drop-label">Placement Tools</p>
              <div className="nb-drop-grid">
                {NAV_FEATURES.map((f) => (
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

        {/* Resources dropdown */}
        <div className="nb-drop-wrap">
          <button
            className={`nb-link ${anyActive(NAV_RESOURCES) || open === "res" ? "nb-link-active" : ""}`}
            onClick={() => toggle("res")}
          >
            Resources <ChevronIcon open={open === "res"} />
          </button>
          {open === "res" && (
            <div className="nb-dropdown nb-dropdown-sm">
              <p className="nb-drop-label">Learning Resources</p>
              <button className="nb-drop-all" onClick={() => go("/resources")}>
                📂 View All Resources →
              </button>
              <div className="nb-drop-col">
                {NAV_RESOURCES.map((r) => (
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

        <button
          className={`nb-link ${isActive("/community") ? "nb-link-active" : ""}`}
          onClick={() => go("/community")}
        >
          Community
        </button>

      </div>

      {/* ── Right Actions ── */}
      <div className="nb-right">

        {/* Theme toggle */}
        <button className="nb-icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {form ? (
          <>
            {/* Bell */}
            <button className="nb-icon-btn nb-bell" title="Notifications">
              🔔
              <span className="nb-bell-dot" />
            </button>

            {/* User menu */}
            <div className="nb-user-wrap">
              <button className="nb-user-btn" onClick={() => toggle("user")}>
                <div className="nb-avatar">{initials}</div>
                <div className="nb-user-info">
                  <span className="nb-user-name">{form.name.split(" ")[0]}</span>
                  <span className="nb-user-role">{form.branch}</span>
                </div>
                <ChevronIcon open={open === "user"} />
              </button>

              {open === "user" && (
                <div className="nb-user-menu">
                  <div className="nb-um-header">
                    <div className="nb-avatar nb-avatar-lg">{initials}</div>
                    <div>
                      <p className="nb-um-name">{form.name}</p>
                      <p className="nb-um-sub">{form.branch} · {form.year}</p>
                    </div>
                  </div>
                  <hr className="nb-um-divider" />
                  <button className="nb-um-item" onClick={() => { setOpen(null); onProfileClick?.(); go("/profile"); }}>
                    👤 View Profile
                  </button>
                  <button className="nb-um-item" onClick={() => go("/dashboard")}>
                    📊 Dashboard
                  </button>
                  <button className="nb-um-item" onClick={() => go("/resources")}>
                    📚 Resources
                  </button>
                  <hr className="nb-um-divider" />
                  <button className="nb-um-item nb-um-logout" onClick={() => { setOpen(null); onLogout?.(); go("/"); }}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button className="nb-btn-ghost" onClick={() => go("/")}>Log In</button>
            <button className="nb-btn-primary" onClick={() => go("/")}>Sign Up Free</button>
          </>
        )}
      </div>

    </nav>
  );
}
