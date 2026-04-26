import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./InterviewTips.css";

const categories = [
  {
    icon: "🧠", title: "Technical Round",
    tips: [
      "Revise core CS fundamentals: OS, DBMS, CN, OOP",
      "Practice coding on paper before typing — interviewers love clarity",
      "Always explain your thought process out loud while solving",
      "Know time & space complexity of every solution you write",
      "Prepare 2–3 projects you can explain end-to-end confidently",
    ],
  },
  {
    icon: "💼", title: "HR Round",
    tips: [
      "Use STAR format: Situation, Task, Action, Result for every answer",
      "Research the company's mission, products, and recent news",
      "Prepare answers for: Tell me about yourself, strengths/weaknesses",
      "Always have 2–3 thoughtful questions ready to ask the interviewer",
      "Dress professionally and maintain confident eye contact",
    ],
  },
  {
    icon: "🗣️", title: "Communication",
    tips: [
      "Speak slowly and clearly — nervousness speeds up speech",
      "Use structured answers: Point → Explanation → Example",
      "Avoid filler words like 'umm', 'like', 'you know'",
      "Practice mock interviews with friends or record yourself",
      "Active listening: nod, maintain eye contact, don't interrupt",
    ],
  },
  {
    icon: "⏱️", title: "Before the Interview",
    tips: [
      "Sleep 8 hours the night before — a rested mind performs better",
      "Reach the venue 15 minutes early (or log in 5 min early for virtual)",
      "Carry multiple copies of your resume and a notepad",
      "Review your resume thoroughly — every line is fair game",
      "Do a quick 10-minute warm-up: solve one easy coding problem",
    ],
  },
];

const dosDonts = [
  { do: "Be honest if you don't know something", dont: "Bluff or make up answers" },
  { do: "Ask clarifying questions before solving", dont: "Jump into coding without understanding" },
  { do: "Show enthusiasm for the role", dont: "Badmouth previous experiences" },
  { do: "Follow up with a thank-you email", dont: "Ghost after the interview" },
];

const InterviewTips = ({ form }) => {
  const navigate = useNavigate();
  const [openIdx, setOpenIdx] = useState(0);

  if (!form) return <div className="it-guard"><p>Please login first.</p><button onClick={() => navigate("/")}>Login</button></div>;

  return (
    <div className="it-page">
      <Navbar form={form} onLogout={() => navigate("/")} onProfileClick={() => navigate("/profile")} />

      {/* Hero */}
      <div className="it-hero">
        <div className="it-hero-badge">📝 Resource Guide</div>
        <h1>Interview Tips & Strategies</h1>
        <p>Master every round with proven techniques used by top placement achievers</p>
        <div className="it-hero-stats">
          <span>✅ 20+ Tips</span><span>🎯 4 Categories</span><span>🏆 Proven Strategies</span>
        </div>
      </div>

      <div className="it-body">

        {/* Accordion Categories */}
        <div className="it-section-label">📂 Tips by Category</div>
        <div className="it-accordion">
          {categories.map((cat, i) => (
            <div key={i} className={`it-acc-item ${openIdx === i ? "it-acc-open" : ""}`}>
              <button className="it-acc-header" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                <span className="it-acc-icon">{cat.icon}</span>
                <span className="it-acc-title">{cat.title}</span>
                <span className="it-acc-arrow">{openIdx === i ? "▲" : "▼"}</span>
              </button>
              {openIdx === i && (
                <ul className="it-acc-body">
                  {cat.tips.map((tip, j) => (
                    <li key={j}><span className="it-tip-dot">→</span>{tip}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Do's & Don'ts */}
        <div className="it-section-label">⚖️ Do's & Don'ts</div>
        <div className="it-dd-grid">
          <div className="it-dd-col it-do-col">
            <h3>✅ Do's</h3>
            {dosDonts.map((d, i) => <div key={i} className="it-dd-item">{d.do}</div>)}
          </div>
          <div className="it-dd-col it-dont-col">
            <h3>❌ Don'ts</h3>
            {dosDonts.map((d, i) => <div key={i} className="it-dd-item">{d.dont}</div>)}
          </div>
        </div>

        {/* Quick Checklist */}
        <div className="it-section-label">🗒️ Day-of Checklist</div>
        <div className="it-checklist">
          {["Resume printed (3 copies)", "ID proof ready", "Outfit ironed", "Company research done", "Questions prepared for interviewer", "Charged laptop/phone", "Calm mindset ✨"].map((item, i) => (
            <div key={i} className="it-check-item">
              <span className="it-check-box">☐</span>{item}
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default InterviewTips;
