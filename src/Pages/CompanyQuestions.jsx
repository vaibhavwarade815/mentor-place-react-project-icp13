import React, { useState } from "react";
import "../styles/CompanyQuestions.css";
import MockInterview from "../Pages/MockInterview";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";



const CompanyQuestions = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const companies = ["TCS", "Infosys", "Wipro", "Accenture", "Capgemini"];
  const subjects = ["C", "C++", "Java", "Python", "SQL", "Aptitude"];

  const questionsData = {
    Java: ["JVM?", "JDK?", "OOP?", "Inheritance?", "Polymorphism?", "Encapsulation?", "Abstraction?", "Exception?", "Threads?", "Collections?", "ArrayList?", "Interface?", "Abstract?", "Overloading?", "Overriding?"],
    C: ["Pointer?", "Structure?", "malloc?", "Array?", "Recursion?", "Function?", "Null pointer?", "File handling?", "DMA?", "Stack vs Heap?", "Macro?", "Union?", "typedef?", "Seg fault?", "Preprocessor?"],
    "C++": ["OOP?", "Class?", "Constructor?", "Destructor?", "Inheritance?", "Polymorphism?", "Encapsulation?", "Operator overloading?", "Virtual?", "Friend?", "Namespace?", "Template?", "STL?", "C vs C++?", "Abstraction?"],
    Python: ["Python?", "List?", "Tuple?", "Dict?", "Set?", "Function?", "Lambda?", "OOP?", "Module?", "Package?", "Exception?", "Loop?", "Recursion?", "File handling?", "Inheritance?"],
    SQL: ["DBMS?", "SQL?", "Primary key?", "Foreign key?", "Join?", "Types?", "Normalization?", "Index?", "View?", "Procedure?", "Trigger?", "Transaction?", "ACID?", "Group by?", "Having?"],
    Aptitude: ["Time Work", "Speed", "Profit", "SI", "CI", "Ratio", "Probability", "Permutation", "Number", "Average", "Percentage", "Mixture", "Calendar", "Clock", "DI"]
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setSelectedSubject(null);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div className="company-questions-container">
      <h1 className="title">🚀 Placement Preparation Hub</h1>

      {/* Company Cards */}
      <div className="cards">
        {companies.map((company, idx) => (
          <div 
            key={idx}
            className="card"
            onClick={() => handleCompanyClick(company)}
          >
            💼 {company}
          </div>
        ))}
      </div>

      {/* Subjects */}
      {selectedCompany && (
        <div className="subjects">
          <h2>{selectedCompany} Subjects</h2>
          <div className="subject-buttons">
            {subjects.map((subject, idx) => (
              <button
                key={idx}
                className="subject-btn"
                onClick={() => handleSubjectClick(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Questions */}
      {selectedSubject && selectedCompany && (
        <div className="question-box">
          <h2>{selectedCompany} - {selectedSubject}</h2>
          <ul>
            {questionsData[selectedSubject].map((question, idx) => (
              <li key={idx}>{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompanyQuestions;

  document.getElementById("questions").innerHTML = html;
  document.getElementById("questions").classList.remove("hidden");
