import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const allFeatures = [
  { title: "Resume Upload",         icon: "📄", key: "resume",    score: 15 },
  { title: "Placement Preparation", icon: "📚", key: "prep",      score: 20 },
  { title: "Mock Interview",        icon: "🎤", key: "mock",      score: 20 },
  { title: "Progress Tracker",      icon: "📊", key: "progress",  score: 15 },
  { title: "Career Guidance",       icon: "🚀", key: "career",    score: 15 },
  { title: "Student Community",     icon: "👨🎓", key: "community", score: 15 },
];

const ProfilePage = ({ form, completed }) => {
  const navigate = useNavigate();

  if (!form) {
    return (
      <div className="pp-guard">
        <p>Please login first.</p>
        <button onClick={() => navigate("/home")}>Go to Login</button>
      </div>
    );
  }

  const doneCount    = Object.values(completed).filter(Boolean).length;
  const profileScore = Math.round((!!form.name + !!form.branch + !!form.year + !!form.skills) * 25);
  const taskScore    = allFeatures.reduce((acc, f) => acc + (completed[f.key] ? f.score : 0), 0);
  const totalScore   = Math.min(100, Math.round(profileScore * 0.4 + taskScore * 0.6));
  const initials     = form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const getLevel = () => {
    if (totalScore >= 85) return { label: "Placement Ready 🏆", color: "#22c55e" };
    if (totalScore >= 60) return { label: "On Track 🚀",        color: "#a78bfa" };
    if (totalScore >= 35) return { label: "In Progress ⚡",     color: "#f59e0b" };
    return                       { label: "Just Started 🌱",    color: "#94a3b8" };
  };

  const level = getLevel();

  return (
    <div className="pp-page">
      <Navbar form={form} onLogout={() => navigate("/home")} onProfileClick={() => {}} />

      <div className="pp-body">

        {/* ── Hero Card ── */}
        <div className="pp-hero">
          <div className="pp-avatar">{initials}</div>
          <div className="pp-hero-info">
            <h1 className="pp-name">{form.name}</h1>
            <p className="pp-meta">{form.branch} &nbsp;·&nbsp; {form.year}</p>
            {form.skills && (
              <div className="pp-skills">
                {form.skills.split(",").map((s, i) => (
                  <span key={i} className="pp-skill-tag">{s.trim()}</span>
                ))}
              </div>
            )}
          </div>
          <div className="pp-level-badge" style={{ borderColor: level.color, color: level.color }}>
            {level.label}
          </div>
        </div>

        {/* ── Score Cards ── */}
        <div className="pp-score-grid">
          <div className="pp-score-card">
            <span className="pp-sc-icon">🏆</span>
            <span className="pp-sc-val">{totalScore}%</span>
            <span className="pp-sc-label">Overall Score</span>
            <div className="pp-sc-bar"><div className="pp-sc-fill pp-sc-fill-gold" style={{ width: `${totalScore}%` }} /></div>
          </div>
          <div className="pp-score-card">
            <span className="pp-sc-icon">👤</span>
            <span className="pp-sc-val">{profileScore}%</span>
            <span className="pp-sc-label">Profile Complete</span>
            <div className="pp-sc-bar"><div className="pp-sc-fill pp-sc-fill-purple" style={{ width: `${profileScore}%` }} /></div>
          </div>
          <div className="pp-score-card">
            <span className="pp-sc-icon">✅</span>
            <span className="pp-sc-val">{doneCount} / {allFeatures.length}</span>
            <span className="pp-sc-label">Tasks Completed</span>
            <div className="pp-sc-bar"><div className="pp-sc-fill pp-sc-fill-green" style={{ width: `${(doneCount / allFeatures.length) * 100}%` }} /></div>
          </div>
          <div className="pp-score-card">
            <span className="pp-sc-icon">🎯</span>
            <span className="pp-sc-val">{taskScore}pts</span>
            <span className="pp-sc-label">Task Points</span>
            <div className="pp-sc-bar"><div className="pp-sc-fill pp-sc-fill-pink" style={{ width: `${taskScore}%` }} /></div>
          </div>
        </div>

        {/* ── Student Info ── */}
        <div className="pp-section-title">📋 Student Information</div>
        <div className="pp-info-grid">
          <div className="pp-info-card"><span className="pp-info-label">Full Name</span><strong>{form.name}</strong></div>
          <div className="pp-info-card"><span className="pp-info-label">Branch</span><strong>{form.branch}</strong></div>
          <div className="pp-info-card"><span className="pp-info-label">Year</span><strong>{form.year}</strong></div>
          <div className="pp-info-card"><span className="pp-info-label">Skills</span><strong>{form.skills || "—"}</strong></div>
        </div>

        {/* ── Task Activity ── */}
        <div className="pp-section-title">⚡ Task Activity</div>
        <div className="pp-tasks">
          {allFeatures.map((f) => {
            const done = !!completed[f.key];
            return (
              <div key={f.key} className={`pp-task-row ${done ? "pp-task-done" : ""}`}>
                <span className="pp-task-icon">{f.icon}</span>
                <span className="pp-task-title">{f.title}</span>
                <div className="pp-task-bar-wrap">
                  <div className="pp-task-bar-fill" style={{ width: done ? "100%" : "0%" }} />
                </div>
                <span className="pp-task-pts">{done ? `+${f.score}pts` : "0pts"}</span>
                <span className={`pp-task-badge ${done ? "pp-badge-done" : "pp-badge-pending"}`}>
                  {done ? "✅ Done" : "⏳ Pending"}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
