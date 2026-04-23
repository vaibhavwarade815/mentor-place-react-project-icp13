import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      <h1 className="title">Welcome to PlaceMentor AI 👋</h1>

      <div className="card-grid">

        <FeatureCard
          title="Resume Upload"
          desc="Upload & analyze your resume"
          onClick={() => navigate("/upload")}
        />

        <FeatureCard
          title="Placement Preparation"
          desc="Prepare for company interviews"
          onClick={() => navigate("/preparation")}
        />

        <FeatureCard
          title="Mock Interview"
          desc="Practice real interview questions"
          onClick={() => navigate("/mock")}
        />

        <FeatureCard
          title="Progress Tracker"
          desc="Track your improvement"
          onClick={() => navigate("/progress")}
        />

      </div>

    </div>
  );
};

export default Dashboard;