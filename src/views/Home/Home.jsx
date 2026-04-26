import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import FloatingThemeToggle from "../Components/FloatingThemeToggle";

const features = [
  { icon: "📄", title: "Resume Upload",         desc: "Upload & get AI-powered resume analysis and improvement tips." },
  { icon: "📚", title: "Placement Preparation", desc: "Topic-wise study plans tailored for campus placements." },
  { icon: "🎤", title: "Mock Interview",         desc: "Practice with real interview questions and get instant feedback." },
  { icon: "📊", title: "Progress Tracker",       desc: "Visualize your preparation journey with detailed analytics." },
  { icon: "🚀", title: "Career Guidance",        desc: "Get personalized career advice from industry mentors." },
  { icon: "👨🎓", title: "Student Community",    desc: "Connect, share tips, and grow with 500+ placement aspirants." },
];

const stats = [
  { value: "500+", label: "Students Placed" },
  { value: "50+",  label: "Companies" },
  { value: "6",    label: "Core Features" },
  { value: "100%", label: "Free Forever" },
];

const testimonials = [
  { name: "Priya Sharma",  branch: "CSE · IIT Delhi",    avatar: "PS", text: "PlacementPro helped me crack TCS and Infosys in the same week. The mock interviews are incredibly realistic!", rating: 5 },
  { name: "Rahul Mehta",   branch: "ECE · NIT Trichy",   avatar: "RM", text: "The DSA roadmap is structured perfectly. I went from zero to cracking Amazon in just 3 months.", rating: 5 },
  { name: "Sneha Patel",   branch: "IT · BITS Pilani",   avatar: "SP", text: "The community feature is gold. Got referrals and insider tips that no coaching class would give you.", rating: 5 },
];

const Home = ({ form }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (form) navigate("/dashboard");
    else navigate("/signup");
  };

  return (
    <div className="home">
      <FloatingThemeToggle />

      {/* ── Navbar ── */}
      <nav className="home-nav">
        <div className="home-nav-brand">
          <span>🎓</span>
          <span>Placement<strong>Pro</strong></span>
        </div>
        <div className="home-nav-links">
          <a href="#features">Features</a>
          <a href="#stats">Stats</a>
          <a href="#testimonials">Reviews</a>
        </div>
        <div className="home-nav-actions">
          {form ? (
            <button className="home-btn-primary" onClick={() => navigate("/dashboard")}>
              🚀 Go to Dashboard →
            </button>
          ) : (
            <>
              <button className="home-btn-ghost" onClick={() => navigate("/login")}>Log In</button>
              <button className="home-btn-primary" onClick={() => navigate("/signup")}>Sign Up Free</button>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="home-hero-glow home-glow-1" />
        <div className="home-hero-glow home-glow-2" />
        <div className="home-hero-content">
          <div className="home-hero-badge">🎯 #1 Placement Prep Platform</div>
          <h1 className="home-hero-title">
            Land Your Dream Job<br />
            <span className="home-gradient-text">With Confidence</span>
          </h1>
          <p className="home-hero-sub">
            Everything you need to crack campus placements — resume analysis, mock interviews,
            DSA roadmap, company guides, and a thriving student community.
          </p>
          <div className="home-hero-btns">
            <button className="home-btn-primary home-btn-lg" onClick={handleGetStarted}>
              {form ? "🚀 Go to Dashboard →" : "Get Started Free →"}
            </button>
            <button className="home-btn-outline home-btn-lg" onClick={() => navigate(form ? "/dashboard" : "/signup")}>
              Explore Resources
            </button>
          </div>
          <div className="home-hero-trust">
            <div className="home-trust-avatars">
              {["PS","RM","SP","AN","DR"].map((a,i) => (
                <div key={i} className="home-trust-av" style={{ zIndex: 5-i }}>{a}</div>
              ))}
            </div>
            <span>Joined by <strong>500+ students</strong> this month</span>
          </div>
        </div>

        {/* Hero visual */}
        <div className="home-hero-visual">
          <div className="home-card-float home-card-1">
            <span>📊</span>
            <div>
              <p className="home-cf-title">Progress Score</p>
              <p className="home-cf-val">87%</p>
            </div>
          </div>
          <div className="home-card-float home-card-2">
            <span>✅</span>
            <div>
              <p className="home-cf-title">Tasks Done</p>
              <p className="home-cf-val">5 / 6</p>
            </div>
          </div>
          <div className="home-card-float home-card-3">
            <span>🏆</span>
            <div>
              <p className="home-cf-title">Status</p>
              <p className="home-cf-val">Excellent 🚀</p>
            </div>
          </div>
          <div className="home-hero-mockup">
            <div className="home-mockup-bar">
              <span /><span /><span />
            </div>
            <div className="home-mockup-body">
              <div className="home-mockup-title">🎓 PlacementPro Dashboard</div>
              <div className="home-mockup-cards">
                {features.slice(0,4).map((f,i) => (
                  <div key={i} className="home-mockup-card">
                    <span>{f.icon}</span>
                    <p>{f.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="home-stats" id="stats">
        {stats.map((s, i) => (
          <div key={i} className="home-stat-item">
            <span className="home-stat-val">{s.value}</span>
            <span className="home-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── Features ── */}
      <section className="home-features" id="features">
        <div className="home-section-badge">⚡ Everything You Need</div>
        <h2 className="home-section-title">6 Powerful Features to<br /><span className="home-gradient-text">Ace Your Placements</span></h2>
        <p className="home-section-sub">From resume to offer letter — we've got every step covered.</p>
        <div className="home-features-grid">
          {features.map((f, i) => (
            <div key={i} className="home-feature-card" onClick={handleGetStarted}>
              <div className="home-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="home-feature-arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="home-how">
        <div className="home-section-badge">🗺️ Simple Process</div>
        <h2 className="home-section-title">Get Placed in <span className="home-gradient-text">3 Simple Steps</span></h2>
        <div className="home-steps">
          {[
            { step: "01", icon: "✍️", title: "Create Your Profile",  desc: "Sign up in 60 seconds. Add your branch, year, and skills." },
            { step: "02", icon: "📚", title: "Follow the Roadmap",   desc: "Use our structured resources — DSA, aptitude, mock interviews." },
            { step: "03", icon: "🏆", title: "Land Your Dream Job",  desc: "Apply with confidence. Track your progress and celebrate wins." },
          ].map((s, i) => (
            <div key={i} className="home-step">
              <div className="home-step-num">{s.step}</div>
              <div className="home-step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < 2 && <div className="home-step-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="home-testimonials" id="testimonials">
        <div className="home-section-badge">💬 Student Reviews</div>
        <h2 className="home-section-title">Loved by <span className="home-gradient-text">Students Everywhere</span></h2>
        <div className="home-testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="home-testi-card">
              <div className="home-testi-stars">{"⭐".repeat(t.rating)}</div>
              <p className="home-testi-text">"{t.text}"</p>
              <div className="home-testi-author">
                <div className="home-testi-av">{t.avatar}</div>
                <div>
                  <p className="home-testi-name">{t.name}</p>
                  <p className="home-testi-branch">{t.branch}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="home-cta">
        <div className="home-cta-glow" />
        <h2>Ready to Start Your<br /><span className="home-gradient-text">Placement Journey?</span></h2>
        <p>Join 500+ students who are already preparing smarter with PlacementPro.</p>
        <button className="home-btn-primary home-btn-lg" onClick={handleGetStarted}>
          {form ? "🚀 Go to Dashboard →" : "Create Free Account →"}
        </button>
        <p className="home-cta-note">No credit card · No spam · 100% free</p>
      </section>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <div className="home-footer-brand">🎓 Placement<strong>Pro</strong></div>
        <p>© {new Date().getFullYear()} PlacementPro. Made with ❤️ for students.</p>
        <div className="home-footer-links">
          <span onClick={() => navigate("/signup")}>Sign Up</span>
          <span onClick={() => navigate("/login")}>Login</span>
          {form && <span onClick={() => navigate("/dashboard")}>Dashboard</span>}
        </div>
      </footer>
    </div>
  );
};

export default Home;
