import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./PlacementFAQs.css";

const faqData = [
  {
    category: "🎯 General Placement",
    faqs: [
      { q: "When should I start preparing for placements?", a: "Ideally start in your 5th semester (3rd year). Focus on DSA, aptitude, and core subjects. 6 months of consistent preparation is enough to crack most companies." },
      { q: "What is the difference between on-campus and off-campus placements?", a: "On-campus placements are organized by your college where companies visit directly. Off-campus means applying independently through job portals like LinkedIn, Naukri, or company websites. Both are valid paths." },
      { q: "How many companies should I apply to?", a: "Apply to as many as possible — there's no limit. Categorize them into dream companies (top 20%), target companies (60%), and safety companies (20%). Cast a wide net." },
      { q: "Does CGPA matter for placements?", a: "Most companies have a CGPA cutoff of 6.0–7.0. Above 7.5 CGPA opens doors to premium companies. However, strong skills can compensate for average CGPA in many cases." },
    ],
  },
  {
    category: "💻 Technical Preparation",
    faqs: [
      { q: "Which programming language should I use for coding interviews?", a: "Python is recommended for its concise syntax. Java and C++ are also widely accepted. Pick one language and master it completely — consistency matters more than the choice." },
      { q: "How many LeetCode problems should I solve?", a: "Quality over quantity. Solve 150–200 problems covering all major patterns: arrays, strings, trees, graphs, DP. Focus on understanding patterns, not memorizing solutions." },
      { q: "Is system design required for campus placements?", a: "For most mass recruiters (TCS, Infosys, Wipro) — No. For product companies (Amazon, Microsoft, Flipkart) at SDE-1 level — basic system design concepts like scalability, databases, and APIs are expected." },
      { q: "What core CS subjects are most important?", a: "DBMS (SQL queries, normalization), Operating Systems (process management, memory), Computer Networks (TCP/IP, HTTP), and OOP concepts are the most frequently tested subjects." },
    ],
  },
  {
    category: "📄 Resume & Applications",
    faqs: [
      { q: "How long should my resume be?", a: "1 page for freshers — no exceptions. Use a clean ATS-friendly format. Include: Education, Skills, Projects (2–3), Internships, Certifications, and Achievements." },
      { q: "What projects should I include in my resume?", a: "Include 2–3 projects you can explain confidently end-to-end. Full-stack web apps, ML projects, or mobile apps work well. Host them on GitHub and deploy if possible." },
      { q: "Should I include all my skills on the resume?", a: "Only list skills you can answer questions about. Listing 'Machine Learning' and not knowing basics is a red flag. Be honest — interviewers will probe every skill you mention." },
      { q: "How important are internships?", a: "Very important for product companies. Even a 1-month internship shows real-world experience. Apply for internships from 2nd year onwards via LinkedIn, Internshala, and company portals." },
    ],
  },
  {
    category: "🗣️ Interview Process",
    faqs: [
      { q: "How do I handle a question I don't know the answer to?", a: "Be honest. Say 'I'm not sure about the exact answer, but here's how I'd approach it...' Interviewers respect honesty and logical thinking over bluffing. Never make up answers." },
      { q: "What should I ask the interviewer at the end?", a: "Ask about: team culture, tech stack used, growth opportunities, or what a typical day looks like. Avoid asking about salary in technical rounds. Asking good questions shows genuine interest." },
      { q: "How many rounds does a typical placement process have?", a: "Usually 3–5 rounds: Online Test → Technical Round 1 → Technical Round 2 (sometimes) → HR Round. Product companies may have 4–6 rounds including a Bar Raiser or managerial round." },
      { q: "How do I negotiate salary as a fresher?", a: "Research the market rate for your role and location. If given an offer, you can politely ask 'Is there flexibility in the compensation?' Most companies have a fixed fresher package, but it's worth asking." },
    ],
  },
];

const PlacementFAQs = ({ form }) => {
  const navigate = useNavigate();
  const [openMap, setOpenMap] = useState({});

  if (!form) return (
    <div className="faq-guard">
      <p>Please login first.</p>
      <button onClick={() => navigate("/")}>Login</button>
    </div>
  );

  const toggle = (key) => setOpenMap(p => ({ ...p, [key]: !p[key] }));
  const totalFaqs = faqData.reduce((a, c) => a + c.faqs.length, 0);

  return (
    <div className="faq-page">
      <Navbar form={form} onLogout={() => navigate("/")} onProfileClick={() => navigate("/profile")} />

      {/* Hero */}
      <div className="faq-hero">
        <div className="faq-hero-badge">🎯 Placement FAQs</div>
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about placements — answered clearly and honestly</p>
        <div className="faq-hero-stats">
          <span>❓ {totalFaqs} Questions</span>
          <span>📂 {faqData.length} Categories</span>
          <span>✅ Expert Answers</span>
        </div>
      </div>

      <div className="faq-body">
        {faqData.map((section, si) => (
          <div key={si} className="faq-section">
            <h2 className="faq-category">{section.category}</h2>
            <div className="faq-list">
              {section.faqs.map((item, fi) => {
                const key = `${si}-${fi}`;
                return (
                  <div key={key} className={`faq-item ${openMap[key] ? "faq-item-open" : ""}`}>
                    <button className="faq-question" onClick={() => toggle(key)}>
                      <span>{item.q}</span>
                      <span className="faq-icon">{openMap[key] ? "−" : "+"}</span>
                    </button>
                    {openMap[key] && (
                      <div className="faq-answer">{item.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div className="faq-cta">
          <h3>Still have questions? 🤔</h3>
          <p>Join the Student Community to ask questions and get answers from peers and mentors.</p>
          <button className="faq-cta-btn" onClick={() => navigate("/community")}>
            👨🎓 Go to Community →
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlacementFAQs;
