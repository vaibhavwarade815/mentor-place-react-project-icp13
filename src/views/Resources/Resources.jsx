import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./Resources.css";

const resources = [
  {
    icon: "📝",
    title: "Interview Tips",
    desc: "Master every round with proven strategies, do's & don'ts, and a day-of checklist.",
    path: "/resources/interview-tips",
    tag: "Most Popular",
    tagColor: "#16a34a",
    tagBg: "#dcfce7",
    details: ["20+ Tips", "4 Categories", "Do's & Don'ts", "Day Checklist"],
    color: "#16a34a",
  },
  {
    icon: "💡",
    title: "Aptitude Practice",
    desc: "Topic-wise practice with interactive quizzes covering Quant, Logical, Verbal & Technical.",
    path: "/resources/aptitude",
    tag: "Interactive",
    tagColor: "#ea580c",
    tagBg: "#ffedd5",
    details: ["4 Topics", "Sample Quiz", "Explanations", "Study Tips"],
    color: "#ea580c",
  },
  {
    icon: "🧠",
    title: "DSA Roadmap",
    desc: "A structured 12-week plan to master Data Structures & Algorithms with checkable progress.",
    path: "/resources/dsa",
    tag: "Structured",
    tagColor: "#6366f1",
    tagBg: "#ede9fe",
    details: ["12 Weeks", "4 Phases", "16 Topics", "300+ Problems"],
    color: "#6366f1",
  },
  {
    icon: "📖",
    title: "Company Guides",
    desc: "Round-wise breakdown, focus areas, and insider tips for TCS, Infosys, Amazon & more.",
    path: "/resources/companies",
    tag: "Company-wise",
    tagColor: "#1d4ed8",
    tagBg: "#dbeafe",
    details: ["6 Companies", "Round Breakdown", "Focus Areas", "Pro Tips"],
    color: "#1d4ed8",
  },
  {
    icon: "🎯",
    title: "Placement FAQs",
    desc: "16 most-asked placement questions answered clearly — prep to salary negotiation.",
    path: "/resources/faqs",
    tag: "Quick Read",
    tagColor: "#0d9488",
    tagBg: "#ccfbf1",
    details: ["16 FAQs", "4 Categories", "Expert Answers", "Community CTA"],
    color: "#0d9488",
  },
];

const Resources = ({ form }) => {
  const navigate = useNavigate();

  if (!form) return (
    <div className="rc-guard">
      <p>Please login first.</p>
      <button onClick={() => navigate("/home")}>Go to Login</button>
    </div>
  );

  return (
    <div className="rc-page">
      <Navbar form={form} onLogout={() => navigate("/home")} onProfileClick={() => navigate("/profile")} />

      {/* Title */}
      <h1 className="rc-title">📚 Resource Center</h1>
      <p className="rc-subtitle">Everything you need to crack placements — all in one place</p>

      {/* Stats Bar */}
      <div className="rc-stats-bar">
        <div className="rc-stat">
          <span className="rc-stat-icon">📂</span>
          <span className="rc-stat-val">5</span>
          <span className="rc-stat-label">Resources</span>
        </div>
        <div className="rc-stat">
          <span className="rc-stat-icon">📝</span>
          <span className="rc-stat-val">20+</span>
          <span className="rc-stat-label">Interview Tips</span>
        </div>
        <div className="rc-stat">
          <span className="rc-stat-icon">🧠</span>
          <span className="rc-stat-val">300+</span>
          <span className="rc-stat-label">DSA Problems</span>
        </div>
        <div className="rc-stat">
          <span className="rc-stat-icon">🏢</span>
          <span className="rc-stat-val">6</span>
          <span className="rc-stat-label">Companies</span>
        </div>
        <div className="rc-stat">
          <span className="rc-stat-icon">✅</span>
          <span className="rc-stat-val">Free</span>
          <span className="rc-stat-label">Forever</span>
        </div>
      </div>

      {/* Section heading */}
      <h2 className="rc-section-title">Choose a Resource to Explore</h2>

      {/* Cards */}
      <div className="rc-card-grid">
        {resources.map((r, i) => (
          <div key={i} className="rc-card" onClick={() => navigate(r.path)}>

            {/* Shimmer effect */}
            <div className="rc-card-shimmer" />

            {/* Icon */}
            <div className="rc-card-icon">{r.icon}</div>

            {/* Tag */}
            <span
              className="rc-card-tag"
              style={{ color: r.tagColor, background: r.tagBg }}
            >
              {r.tag}
            </span>

            {/* Title & Desc */}
            <h3 className="rc-card-title">{r.title}</h3>
            <p className="rc-card-desc">{r.desc}</p>

            {/* Detail pills */}
            <div className="rc-card-pills">
              {r.details.map((d, j) => (
                <span key={j} className="rc-pill">{d}</span>
              ))}
            </div>

            {/* Progress bar (decorative, full = ready) */}
            <div className="rc-card-bar-wrap">
              <div className="rc-card-bar-fill" style={{ background: r.color }} />
            </div>
            <span className="rc-card-bar-label">Ready to explore</span>

            {/* CTA Button */}
            <button
              className="rc-card-btn"
              style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}cc)` }}
              onClick={(e) => { e.stopPropagation(); navigate(r.path); }}
            >
              Open {r.title} →
            </button>

          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Resources;
