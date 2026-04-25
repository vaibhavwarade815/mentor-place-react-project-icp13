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