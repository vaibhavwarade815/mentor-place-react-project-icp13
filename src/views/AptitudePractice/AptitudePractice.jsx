import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./AptitudePractice.css";

const topics = [
  { icon: "🔢", title: "Quantitative Aptitude", count: 8, subtopics: ["Number System", "Percentages", "Profit & Loss", "Time & Work", "Speed & Distance", "Simple & Compound Interest", "Ratio & Proportion", "Averages"] },
  { icon: "🧩", title: "Logical Reasoning",     count: 6, subtopics: ["Blood Relations", "Seating Arrangement", "Syllogisms", "Coding-Decoding", "Direction Sense", "Puzzles"] },
  { icon: "📝", title: "Verbal Ability",         count: 5, subtopics: ["Reading Comprehension", "Sentence Correction", "Fill in the Blanks", "Para Jumbles", "Vocabulary"] },
  { icon: "💻", title: "Technical Aptitude",     count: 5, subtopics: ["C Output Questions", "Data Structures MCQ", "DBMS Queries", "OS Concepts", "Networking Basics"] },
];

const sampleQuestions = [
  { q: "A train travels 360 km in 4 hours. What is its speed in m/s?", opts: ["25 m/s", "90 m/s", "100 m/s", "72 m/s"], ans: 0, exp: "360 km / 4 hr = 90 km/hr = 90 × (5/18) = 25 m/s" },
  { q: "If 20% of a number is 80, what is 35% of that number?", opts: ["120", "140", "160", "180"], ans: 1, exp: "Number = 80/0.20 = 400. 35% of 400 = 140" },
  { q: "A can do a work in 10 days, B in 15 days. Together they finish in?", opts: ["5 days", "6 days", "8 days", "12 days"], ans: 1, exp: "Combined rate = 1/10 + 1/15 = 5/30 = 1/6. So 6 days." },
];

const AptitudePractice = ({ form }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState({});
  const [revealed, setRevealed] = useState({});
  const [activeTab, setTab] = useState("topics");

  if (!form) return <div className="ap-guard"><p>Please login first.</p><button onClick={() => navigate("/")}>Login</button></div>;

  const score = sampleQuestions.filter((q, i) => selected[i] === q.ans).length;

  return (
    <div className="ap-page">
      <Navbar form={form} onLogout={() => navigate("/")} onProfileClick={() => navigate("/profile")} />

      {/* Hero */}
      <div className="ap-hero">
        <div className="ap-hero-badge">💡 Practice Zone</div>
        <h1>Aptitude Practice Hub</h1>
        <p>Sharpen your problem-solving skills with topic-wise practice and timed quizzes</p>
        <div className="ap-hero-stats">
          <span>📚 4 Topics</span><span>❓ 3 Sample Questions</span><span>⏱️ Timed Practice</span>
        </div>
      </div>

      <div className="ap-body">
        {/* Tabs */}
        <div className="ap-tabs">
          {["topics", "quiz"].map((t) => (
            <button key={t} className={`ap-tab ${activeTab === t ? "ap-tab-active" : ""}`} onClick={() => setTab(t)}>
              {t === "topics" ? "📚 Topics" : "❓ Sample Quiz"}
            </button>
          ))}
        </div>

        {activeTab === "topics" ? (
          <>
            <div className="ap-topics-grid">
              {topics.map((t, i) => (
                <div key={i} className="ap-topic-card">
                  <div className="ap-topic-icon">{t.icon}</div>
                  <h3>{t.title}</h3>
                  <span className="ap-topic-count">{t.count} subtopics</span>
                  <div className="ap-subtopics">
                    {t.subtopics.map((s, j) => <span key={j} className="ap-subtopic">{s}</span>)}
                  </div>
                  <button className="ap-practice-btn">Start Practice →</button>
                </div>
              ))}
            </div>

            {/* Study Tips */}
            <div className="ap-tips-box">
              <h3>⚡ Quick Study Tips</h3>
              <div className="ap-tips-grid">
                {["Solve 20 questions daily for 30 days", "Time yourself — aim under 90 sec/question", "Review wrong answers immediately", "Use elimination method for MCQs", "Practice mental math for speed", "Attempt previous year papers"].map((tip, i) => (
                  <div key={i} className="ap-tip-item"><span>💡</span>{tip}</div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="ap-quiz-header">
              <span>Score: <strong>{score} / {sampleQuestions.length}</strong></span>
              <span>Answer all questions and reveal explanations</span>
            </div>
            <div className="ap-quiz">
              {sampleQuestions.map((q, i) => (
                <div key={i} className="ap-q-card">
                  <p className="ap-q-text"><span className="ap-q-num">Q{i + 1}.</span> {q.q}</p>
                  <div className="ap-opts">
                    {q.opts.map((opt, j) => (
                      <button
                        key={j}
                        className={`ap-opt ${selected[i] === j ? (j === q.ans ? "ap-opt-correct" : "ap-opt-wrong") : ""} ${revealed[i] && j === q.ans ? "ap-opt-correct" : ""}`}
                        onClick={() => setSelected((p) => ({ ...p, [i]: j }))}
                      >
                        <span className="ap-opt-letter">{String.fromCharCode(65 + j)}</span> {opt}
                      </button>
                    ))}
                  </div>
                  <button className="ap-reveal-btn" onClick={() => setRevealed((p) => ({ ...p, [i]: true }))}>
                    {revealed[i] ? "✅ Explanation" : "Show Explanation"}
                  </button>
                  {revealed[i] && <div className="ap-explanation">💡 {q.exp}</div>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AptitudePractice;
