import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResumeAnalysis.css";

const ResumeAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state;

  // If user refreshes page
  if (!result) {
    return (
      <div className="analysis-page">
        <h2>No Data Found</h2>
        <button onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="analysis-page">
      <div className="analysis-card">

        <h2>Resume Analysis</h2>

        {/* SCORE CIRCLE */}
        <div
          className="score-circle"
          style={{ "--score": `${result.score}%` }}
        >
          <h1>{result.score}%</h1>
        </div>

        {/* PROGRESS BAR */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${result.score}%` }}
          ></div>
        </div>

        {/* SUGGESTIONS */}
        <div className="suggestion-box">
          <h3>Suggestions</h3>
          <ul>
            {result.suggestions.map((s, i) => (
              <li key={i}>✔ {s}</li>
            ))}
          </ul>
        </div>

        <button className="back-btn" onClick={() => navigate("/")}>
          Upload Another Resume
        </button>

      </div>
    </div>
  );
};

export default ResumeAnalysis;