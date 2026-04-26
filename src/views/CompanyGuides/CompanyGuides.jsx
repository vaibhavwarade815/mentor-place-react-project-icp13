import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./CompanyGuides.css";

const companies = [
  {
    name: "TCS", logo: "🔵", type: "Mass Recruiter", package: "3.5–7 LPA", difficulty: "Easy",
    rounds: ["Online Test (Aptitude + Coding)", "Technical Interview", "HR Interview"],
    focus: ["Aptitude", "Basic Coding", "Communication", "C/C++/Java Basics"],
    tips: "TCS focuses heavily on aptitude. Practice 30+ aptitude questions daily. The coding section has 1–2 easy problems. Communication matters a lot in HR.",
  },
  {
    name: "Infosys", logo: "🟢", type: "Mass Recruiter", package: "3.6–8 LPA", difficulty: "Easy",
    rounds: ["Hackathon / Online Test", "Technical Interview", "HR Interview"],
    focus: ["Logical Reasoning", "Verbal Ability", "Pseudocode", "Basic DSA"],
    tips: "Infosys InfyTQ certification gives direct interview calls. Focus on logical reasoning and pseudocode. Be confident in HR round.",
  },
  {
    name: "Wipro", logo: "🟡", type: "Mass Recruiter", package: "3.5–6.5 LPA", difficulty: "Easy",
    rounds: ["Online Assessment", "Technical Interview", "HR Interview"],
    focus: ["Aptitude", "Written English", "Basic Programming", "DBMS"],
    tips: "Wipro NLTH is the main hiring drive. Written communication test is unique to Wipro. Prepare essay writing and email writing.",
  },
  {
    name: "Cognizant", logo: "🔷", type: "Mass Recruiter", package: "4–7 LPA", difficulty: "Medium",
    rounds: ["GenC Test", "Technical Interview", "HR Interview"],
    focus: ["Aptitude", "Coding (2 problems)", "Core CS", "Communication"],
    tips: "GenC Next track offers higher package. Solve medium-level coding problems. Core CS subjects like OS and DBMS are important.",
  },
  {
    name: "Amazon", logo: "🟠", type: "Product Company", package: "18–35 LPA", difficulty: "Hard",
    rounds: ["Online Assessment (2 coding)", "Technical Round 1", "Technical Round 2", "Bar Raiser", "HR"],
    focus: ["DSA (Medium-Hard)", "System Design", "Leadership Principles", "Problem Solving"],
    tips: "Amazon's 16 Leadership Principles are crucial for every round. Practice LeetCode medium/hard. System design basics needed for SDE-1.",
  },
  {
    name: "Microsoft", logo: "🪟", type: "Product Company", package: "20–40 LPA", difficulty: "Hard",
    rounds: ["Online Coding Test", "Technical Round 1", "Technical Round 2", "Technical Round 3", "HR"],
    focus: ["DSA", "Problem Solving", "OOP Design", "Behavioral Questions"],
    tips: "Microsoft values problem-solving approach over just the answer. Think aloud. OOP design questions are common. Practice on LeetCode.",
  },
];

const diffStyle = { Easy: { bg: "#dcfce7", color: "#15803d" }, Medium: { bg: "#fef9c3", color: "#a16207" }, Hard: { bg: "#fee2e2", color: "#b91c1c" } };

const CompanyGuides = ({ form }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState("All");

  if (!form) return <div className="cg-guard"><p>Please login first.</p><button onClick={() => navigate("/")}>Login</button></div>;

  const filters = ["All", "Mass Recruiter", "Product Company"];
  const filtered = filter === "All" ? companies : companies.filter(c => c.type === filter);

  return (
    <div className="cg-page">
      <Navbar form={form} onLogout={() => navigate("/")} onProfileClick={() => navigate("/profile")} />

      <div className="cg-hero">
        <div className="cg-hero-badge">📖 Company Guides</div>
        <h1>Company-Wise Placement Guide</h1>
        <p>Know exactly what each company tests, how many rounds, and how to crack them</p>
        <div className="cg-hero-stats">
          <span>🏢 {companies.length} Companies</span>
          <span>📋 Round-wise Breakdown</span>
          <span>💡 Insider Tips</span>
        </div>
      </div>

      <div className="cg-body">
        {/* Filter */}
        <div className="cg-filters">
          {filters.map(f => (
            <button key={f} className={`cg-filter-btn ${filter === f ? "cg-filter-active" : ""}`} onClick={() => { setFilter(f); setActive(0); }}>{f}</button>
          ))}
        </div>

        <div className="cg-layout">
          {/* Company List */}
          <div className="cg-list">
            {filtered.map((c, i) => (
              <div key={i} className={`cg-list-item ${active === i ? "cg-list-active" : ""}`} onClick={() => setActive(i)}>
                <span className="cg-list-logo">{c.logo}</span>
                <div className="cg-list-info">
                  <span className="cg-list-name">{c.name}</span>
                  <span className="cg-list-type">{c.type}</span>
                </div>
                <span className="cg-diff-pill" style={diffStyle[c.difficulty]}>{c.difficulty}</span>
              </div>
            ))}
          </div>

          {/* Detail Panel */}
          {filtered[active] && (() => {
            const c = filtered[active];
            return (
              <div className="cg-detail">
                <div className="cg-detail-header">
                  <span className="cg-detail-logo">{c.logo}</span>
                  <div>
                    <h2>{c.name}</h2>
                    <p>{c.type} · {c.package}</p>
                  </div>
                  <span className="cg-diff-pill cg-diff-lg" style={diffStyle[c.difficulty]}>{c.difficulty}</span>
                </div>

                <div className="cg-detail-section">
                  <h4>📋 Interview Rounds</h4>
                  <div className="cg-rounds">
                    {c.rounds.map((r, i) => (
                      <div key={i} className="cg-round-item">
                        <span className="cg-round-num">{i + 1}</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cg-detail-section">
                  <h4>🎯 Key Focus Areas</h4>
                  <div className="cg-focus-tags">
                    {c.focus.map((f, i) => <span key={i} className="cg-focus-tag">{f}</span>)}
                  </div>
                </div>

                <div className="cg-detail-section">
                  <h4>💡 Pro Tips</h4>
                  <p className="cg-tips-text">{c.tips}</p>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyGuides;
