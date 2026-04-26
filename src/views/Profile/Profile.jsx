import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const features = [
  { title: "Resume Upload",      icon: "📄", key: "resume",    pts: 15, path: "/upload",    color: "#58a6ff" },
  { title: "Placement Prep",     icon: "📚", key: "prep",      pts: 20, path: "/prep",      color: "#bc8cff" },
  { title: "Mock Interview",     icon: "🎤", key: "mock",      pts: 20, path: "/mock",      color: "#f78166" },
  { title: "Progress Tracker",   icon: "📊", key: "progress",  pts: 15, path: "/progress",  color: "#ffa657" },
  { title: "Career Guidance",    icon: "🚀", key: "career",    pts: 15, path: "/career",    color: "#3fb950" },
  { title: "Student Community",  icon: "👥", key: "community", pts: 15, path: "/community", color: "#58a6ff" },
];

export default function ProfilePage({ form, setForm, completed = {} }) {
  const navigate = useNavigate();

  if (!form) return (
    <div className="pp-guard">
      <span className="pp-guard-icon">🔒</span>
      <h2>Not Logged In</h2>
      <p>Please go to the home page to get started.</p>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );

  const done        = Object.values(completed).filter(Boolean).length;
  const total       = features.length;
  const taskPts     = features.reduce((a, f) => a + (completed[f.key] ? f.pts : 0), 0);
  const maxPts      = features.reduce((a, f) => a + f.pts, 0);
  const profilePct  = Math.round((!!form.name + !!form.branch + !!form.year + !!form.skills) * 25);
  const taskPct     = Math.round((done / total) * 100);
  const overallPct  = Math.min(100, Math.round(profilePct * 0.3 + taskPct * 0.7));
  const initials    = form.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const level =
    overallPct >= 80 ? { label: "Placement Ready", icon: "🏆", color: "var(--accent-green)"  } :
    overallPct >= 50 ? { label: "On Track",         icon: "🚀", color: "var(--accent)"        } :
    overallPct >= 25 ? { label: "In Progress",      icon: "⚡", color: "var(--accent-orange)" } :
                       { label: "Just Started",     icon: "🌱", color: "var(--text-muted)"    };

  const stats = [
    { icon: "🏆", val: `${overallPct}%`,       label: "Overall Score",    color: "var(--accent-orange)" },
    { icon: "👤", val: `${profilePct}%`,        label: "Profile Complete", color: "var(--accent)"        },
    { icon: "✅", val: `${done} / ${total}`,    label: "Tasks Done",       color: "var(--accent-green)"  },
    { icon: "🎯", val: `${taskPts}/${maxPts}`,  label: "Points Earned",    color: "var(--accent-purple)" },
  ];

  return (
    <div className="pp-page">
      <Navbar form={form} onLogout={() => navigate("/")} onProfileClick={() => {}} />

      <div className="pp-wrap">

        {/* ── LEFT: Profile Card ── */}
        <aside className="pp-aside">
          <div className="pp-card pp-hero-card">
            <div className="pp-avatar">{initials}</div>
            <h2 className="pp-name">{form.name}</h2>
            <p className="pp-meta">{form.branch} · {form.year}</p>
            <div className="pp-level" style={{ color: level.color }}>
              {level.icon} {level.label}
            </div>
            <div className="pp-score-bar-wrap">
              <div className="pp-score-bar-row">
                <span>Overall</span>
                <span style={{ color: level.color, fontWeight: 700 }}>{overallPct}%</span>
              </div>
              <div className="pp-bar-track">
                <div className="pp-bar-fill" style={{ width: `${overallPct}%`, background: level.color }} />
              </div>
            </div>
            {form.skills && (
              <div className="pp-skills">
                {form.skills.split(",").map((s, i) => (
                  <span key={i} className="pp-skill">{s.trim()}</span>
                ))}
              </div>
            )}
            <button className="pp-dash-btn" onClick={() => navigate("/dashboard")}>
              ← Back to Dashboard
            </button>
          </div>

          {/* Info Card */}
          <div className="pp-card">
            <p className="pp-card-title">📋 Student Info</p>
            {[
              { label: "Full Name", val: form.name },
              { label: "Branch",   val: form.branch },
              { label: "Year",     val: form.year },
              { label: "Skills",   val: form.skills || "—" },
            ].map((r, i) => (
              <div key={i} className="pp-info-row">
                <span className="pp-info-label">{r.label}</span>
                <span className="pp-info-val">{r.val}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── RIGHT: Main Content ── */}
        <main className="pp-main">

          {/* Stats */}
          <div className="pp-stats">
            {stats.map((s, i) => (
              <div key={i} className="pp-stat">
                <div className="pp-stat-icon" style={{ color: s.color }}>{s.icon}</div>
                <div className="pp-stat-val" style={{ color: s.color }}>{s.val}</div>
                <div className="pp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Task Activity */}
          <div className="pp-section">
            <div className="pp-section-head">
              <h3 className="pp-section-title">⚡ Task Activity</h3>
              <span className="pp-section-sub">{done} of {total} completed</span>
            </div>
            <div className="pp-progress-track">
              <div className="pp-progress-fill" style={{ width: `${taskPct}%` }} />
            </div>
            <div className="pp-tasks">
              {features.map((f) => {
                const isDone = !!completed[f.key];
                return (
                  <div
                    key={f.key}
                    className={`pp-task ${isDone ? "pp-task-done" : ""}`}
                    onClick={() => navigate(f.path)}
                  >
                    <div className="pp-task-icon" style={{ background: f.color + "18", color: f.color }}>
                      {f.icon}
                    </div>
                    <div className="pp-task-info">
                      <span className="pp-task-title">{f.title}</span>
                      <div className="pp-task-bar-track">
                        <div className="pp-task-bar-fill" style={{
                          width: isDone ? "100%" : "0%",
                          background: f.color
                        }} />
                      </div>
                    </div>
                    <div className="pp-task-right">
                      <span className="pp-task-pts" style={{ color: isDone ? "var(--accent-green)" : "var(--text-muted)" }}>
                        {isDone ? `+${f.pts}pts` : "0pts"}
                      </span>
                      <span className={`pp-task-badge ${isDone ? "pp-badge-done" : "pp-badge-todo"}`}>
                        {isDone ? "✓ Done" : "Pending"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="pp-section">
            <h3 className="pp-section-title">🏅 Achievements</h3>
            <div className="pp-badges">
              {[
                { icon: "🎯", label: "First Task",    unlocked: done >= 1 },
                { icon: "🔥", label: "Half Way",      unlocked: done >= 3 },
                { icon: "🏆", label: "All Complete",  unlocked: done >= 6 },
                { icon: "📄", label: "Resume Ready",  unlocked: !!completed.resume },
                { icon: "🎤", label: "Mock Pro",      unlocked: !!completed.mock },
                { icon: "👥", label: "Community",     unlocked: !!completed.community },
              ].map((b, i) => (
                <div key={i} className={`pp-badge-item ${b.unlocked ? "pp-badge-unlocked" : "pp-badge-locked"}`}>
                  <span className="pp-badge-icon">{b.icon}</span>
                  <span className="pp-badge-label">{b.label}</span>
                  {!b.unlocked && <span className="pp-badge-lock">🔒</span>}
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
