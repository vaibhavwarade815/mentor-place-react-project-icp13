import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Resume Upload",
      desc: "Upload & analyze resume",
      icon: "📄",
      path: "/upload",
    },
    {
      title: "Placement Preparation",
      desc: "Prepare for interviews",
      icon: "📚",
      path: "/prep",
    },
    {
      title: "Mock Interview",
      desc: "Practice interviews",
      icon: "🎤",
      path: "/mock",
    },
    {
      title: "Progress Tracker",
      desc: "Track your progress",
      icon: "📊",
      path: "/progress",
    },
    {
      title: "Career Guidance",
      desc: "Get career advice",
      icon: "🚀",
      path: "/career",
    },
  ];

  return (
    <div className="dashboard">
      <h1 className="title">Welcome back 👋</h1>

      <div className="card-container">
        {features.map((item, index) => (
          <div
            key={index}
            className="card"
            onClick={() => navigate(item.path)}
          >
            <div className="card-icon">{item.icon}</div>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;