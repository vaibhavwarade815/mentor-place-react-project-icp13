import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./DSARoadmap.css";

const phases = [
  {
    phase: "Phase 1", title: "Foundations", duration: "2–3 weeks", color: "#6366f1",
    topics: [
      { name: "Arrays & Strings",    problems: 25, difficulty: "Easy",   icon: "📦" },
      { name: "Linked Lists",        problems: 20, difficulty: "Easy",   icon: "🔗" },
      { name: "Stacks & Queues",     problems: 15, difficulty: "Easy",   icon: "📚" },
      { name: "Recursion & Backtracking", problems: 20, difficulty: "Medium", icon: "🔄" },
    ],
  },
  {
    phase: "Phase 2", title: "Core Data Structures", duration: "3–4 weeks", color: "#8b5cf6",
    topics: [
      { name: "Trees & BST",         problems: 30, difficulty: "Medium", icon: "🌳" },
      { name: "Heaps & Priority Queue", problems: 15, difficulty: "Medium", icon: "⛰️" },
      { name: "Hashing",             problems: 20, difficulty: "Medium", icon: "#️⃣" },
      { name: "Graphs (BFS/DFS)",    problems: 25, difficulty: "Medium", icon: "🕸️" },
    ],
  },
  {
    phase: "Phase 3", title: "Algorithms", duration: "3–4 weeks", color: "#a855f7",
    topics: [
      { name: "Sorting & Searching", problems: 20, difficulty: "Medium", icon: "🔍" },
      { name: "Dynamic Programming", problems: 40, difficulty: "Hard",   icon: "🧮" },
      { name: "Greedy Algorithms",   problems: 20, difficulty: "Medium", icon: "💰" },
      { name: "Divide & Conquer",    problems: 15, difficulty: "Hard",   icon: "✂️" },
    ],
  },
  {
    phase: "Phase 4", title: "Advanced Topics", duration: "2–3 weeks", color: "#c084fc",
    topics: [
      { name: "Tries & Segment Trees", problems: 15, difficulty: "Hard", icon: "🌲" },
      { name: "Bit Manipulation",    problems: 15, difficulty: "Medium", icon: "⚙️" },
      { name: "Graph Advanced",      problems: 20, difficulty: "Hard",   icon: "🗺️" },
      { name: "System Design Basics",problems: 10, difficulty: "Hard",   icon: "🏗️" },
    ],
  },
];

const resources = [
  { name: "LeetCode",      desc: "Best for interview-style problems",  link: "#", icon: "🟡" },
  { name: "GeeksForGeeks", desc: "Theory + practice combined",         link: "#", icon: "🟢" },
  { name: "Codeforces",    desc: "Competitive programming contests",   link: "#", icon: "🔵" },
  { name: "HackerRank",    desc: "Structured skill tracks",            link: "#", icon: "🟢" },
  { name: "InterviewBit",  desc: "Company-specific preparation",       link: "#", icon: "🔴" },
  { name: "CLRS Book",     desc: "Deep algorithmic theory",            link: "#", icon: "📘" },
];

const diffColor = { Easy: "#22c55e", Medium: "#f59e0b", Hard: "#ef4444" };

const DSARoadmap = ({ form }) => {
  const navigate = useNavigate();
  const [openPhase, setOpenPhase] = useState(0);
  const [checked, setChecked] = useState({});

  if (!form) return <div className="dsa-guard"><p>Please login first.</p><button onClick={() => navigate("/")}>Login</button></div>;

  const totalProblems = phases.flatMap(p => p.topics).reduce((a, t) => a + t.problems, 0);
  const doneTopics = Object.values(checked).filter(Boolean).length;
  const totalTopics = phases.flatMap(p => p.topics).length;

  return (
    <div className="dsa-page">
      <Navbar form={form} onLogout={() => navigate("/")} onProfileClick={() => navigate("/profile")} />

      {/* Hero */}
      <div className="dsa-hero">
        <div className="dsa-hero-badge">🧠 Learning Path</div>
        <h1>DSA Roadmap for Placements</h1>
        <p>A structured 12-week plan to master Data Structures & Algorithms from scratch</p>
        <div className="dsa-hero-stats">
          <span>📅 12 Weeks</span>
          <span>🧩 {totalTopics} Topics</span>
          <span>❓ {totalProblems}+ Problems</span>
          <span>✅ {doneTopics} Done</span>
        </div>
      </div>

      <div className="dsa-body">

        {/* Progress */}
        <div className="dsa-progress-bar-wrap">
          <div className="dsa-progress-info">
            <span>Your Progress</span>
            <span>{doneTopics} / {totalTopics} topics</span>
          </div>
          <div className="dsa-progress-track">
            <div className="dsa-progress-fill" style={{ width: `${(doneTopics / totalTopics) * 100}%` }} />
          </div>
        </div>

        {/* Phases */}
        <div className="dsa-section-label">🗺️ Roadmap Phases</div>
        <div className="dsa-phases">
          {phases.map((p, i) => (
            <div key={i} className={`dsa-phase ${openPhase === i ? "dsa-phase-open" : ""}`} style={{ "--phase-color": p.color }}>
              <div className="dsa-phase-header" onClick={() => setOpenPhase(openPhase === i ? -1 : i)}>
                <div className="dsa-phase-dot" style={{ background: p.color }} />
                <div className="dsa-phase-info">
                  <span className="dsa-phase-label">{p.phase}</span>
                  <span className="dsa-phase-title">{p.title}</span>
                </div>
                <span className="dsa-phase-duration">{p.duration}</span>
                <span className="dsa-phase-arrow">{openPhase === i ? "▲" : "▼"}</span>
              </div>
              {openPhase === i && (
                <div className="dsa-topics">
                  {p.topics.map((t, j) => {
                    const key = `${i}-${j}`;
                    return (
                      <div key={j} className={`dsa-topic-row ${checked[key] ? "dsa-topic-done" : ""}`}>
                        <input type="checkbox" checked={!!checked[key]} onChange={() => setChecked(prev => ({ ...prev, [key]: !prev[key] }))} className="dsa-checkbox" />
                        <span className="dsa-topic-icon">{t.icon}</span>
                        <span className="dsa-topic-name">{t.name}</span>
                        <span className="dsa-topic-problems">{t.problems} problems</span>
                        <span className="dsa-diff-badge" style={{ color: diffColor[t.difficulty], background: diffColor[t.difficulty] + "18" }}>{t.difficulty}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Resources */}
        <div className="dsa-section-label">🔗 Recommended Resources</div>
        <div className="dsa-resources-grid">
          {resources.map((r, i) => (
            <a key={i} href={r.link} className="dsa-resource-card">
              <span className="dsa-res-icon">{r.icon}</span>
              <div>
                <p className="dsa-res-name">{r.name}</p>
                <p className="dsa-res-desc">{r.desc}</p>
              </div>
              <span className="dsa-res-arrow">→</span>
            </a>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default DSARoadmap;
