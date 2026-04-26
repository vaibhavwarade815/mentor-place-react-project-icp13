import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const allFeatures = [
  { title: "Resume Upload",         desc: "Upload & analyze resume",   icon: "📄", path: "/upload",    key: "resume" },
  { title: "Placement Preparation", desc: "Prepare for interviews",    icon: "📚", path: "/prep",      key: "prep" },
  { title: "Mock Interview",        desc: "Practice interviews",       icon: "🎤", path: "/mock",      key: "mock" },
  { title: "Progress Tracker",      desc: "Track your progress",       icon: "📊", path: "/progress",  key: "progress" },
  { title: "Career Guidance",       desc: "Get career advice",         icon: "🚀", path: "/career",    key: "career" },
  { title: "Student Community",     desc: "Connect with students",     icon: "👨🎓", path: "/community", key: "community" },
];

const Dashboard = ({ form, completed, setCompleted, onLogout }) => {
  const navigate = useNavigate();

  const toggleDone = (key) =>
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));

  if (!form) return null;

  const doneCount    = Object.values(completed).filter(Boolean).length;
  const profileScore = Math.round((!!form.name + !!form.branch + !!form.year + !!form.skills) * 25);
  const taskScore    = Math.round((doneCount / allFeatures.length) * 100);

  const getStatus = () => {
    if (doneCount >= 5) return "Excellent 🚀";
    if (doneCount >= 3) return "Good 👍";
    return "Just Getting Started ⚡";
  };

  return (
    <div className="dashboard">
      <Navbar
        form={form}
        onLogout={onLogout}
        onProfileClick={() => navigate("/profile")}
      />

      <h1 className="title">Welcome, {form.name} 👋</h1>
      <p className="subtitle">{form.branch} · {form.year} · {form.skills || "No skills added"}</p>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-icon">👤</span>
          <span className="stat-value">{profileScore}%</span>
          <span className="stat-label">Profile Complete</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">✅</span>
          <span className="stat-value">{doneCount}</span>
          <span className="stat-label">Tasks Done</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🎯</span>
          <span className="stat-value">{allFeatures.length - doneCount}</span>
          <span className="stat-label">Remaining</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">⭐</span>
          <span className="stat-value">{getStatus()}</span>
          <span className="stat-label">Status</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🏆</span>
          <span className="stat-value">{taskScore}%</span>
          <span className="stat-label">Task Score</span>
        </div>
      </div>

      {/* Feature Cards */}
      <h2 className="section-title">Your Placement Checklist</h2>
      <div className="card-container">
        {allFeatures.map((item, index) => (
          <div
            key={index}
            className={`card ${completed[item.key] ? "card-done" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <div className="card-icon">{item.icon}</div>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{ width: completed[item.key] ? "100%" : "0%" }} />
            </div>
            <span className="progress-label">{completed[item.key] ? "✅ Done" : "🔒 Pending"}</span>
            <button
              className={`mark-btn ${completed[item.key] ? "mark-done" : ""}`}
              onClick={(e) => { e.stopPropagation(); toggleDone(item.key); }}
            >
              {completed[item.key] ? "Mark Undone" : "Mark as Done"}
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
