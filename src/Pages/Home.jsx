import "../style/Home.css";
import { useNavigate } from "react-router-dom";

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Resume Analyzer",
      desc: "Improve your resume with smart suggestions.",
      icon: "📄",
    },
    {
      title: "Placement Preparation",
      desc: "Prepare aptitude, coding & interviews.",
      icon: "📚",
    },
    {
      title: "Mock Interview",
      desc: "Practice real interview scenarios.",
      icon: "🎤",
    },
    {
      title: "Progress Tracker",
      desc: "Track your performance and growth.",
      icon: "📊",
    },
  ];

   return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <h1>PlaceMentor</h1>
        <p>Smart Placement Preparation System</p>
        <div className="btn-container">
        <button
          className="btn primary"
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="intro">

        <h2 className="heading">
          About <span>PlaceMentor</span>
        </h2>

        <p className="subtext">
          A smart platform designed to simplify placement preparation using modern technology.
        </p>

        <div className="intro-content">
          <p>
            PlaceMentor helps students prepare efficiently for campus placements by combining
            resume analysis, mock interviews, and structured learning in one system.
          </p>

          <p>
            It identifies strengths and weaknesses and provides step-by-step improvement guidance.
          </p>

          <p>
            With performance tracking and feedback, students can build confidence and succeed
            in real interviews.
          </p>
        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <h2 className="heading">
          Key <span>Features</span>
        </h2>

        <p className="subtext">
          Powerful tools to boost your placement preparation journey.
        </p>

        <div className="card-grid">
          {features.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </div>

      </section>

    </div>
  );
}