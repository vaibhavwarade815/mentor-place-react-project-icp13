import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResumeUpload.css";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = () => {
    if (!file) return alert("Upload resume first!");

    const data = {
      score: Math.floor(Math.random() * 30) + 70,
      suggestions: [
        "Add more quantified achievements",
        "Improve skills section formatting",
        "Include GitHub or portfolio link",
        "Use strong action verbs"
      ]
    };

    navigate("/resume-analysis", { state: data });
  };

  return (
    <div className="upload-page">
      <div className="upload-container">

        <h1>Resume Analyzer</h1>
        <p>Upload your resume to get ATS score & suggestions</p>

        <div
          className="upload-box"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="fileInput"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />

          <label htmlFor="fileInput">
            <div className="upload-icon">⬆</div>
            <h3>Drag & Drop Resume</h3>
            <p>or click to browse</p>
            <span>PDF, DOCX (Max 5MB)</span>
          </label>
        </div>

        {file && <div className="file-name">📄 {file.name}</div>}

        <button className="analyze-btn" onClick={handleAnalyze}>
          Analyze Resume →
        </button>

      </div>
    </div>
  );
};

export default ResumeUpload;