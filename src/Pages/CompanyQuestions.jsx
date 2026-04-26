import React, { useState } from "react";
import "../styles/CompanyQuestions.css";

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

  const handleCardClick = (company) => {
    setSelectedCompany(company);
    setSelectedSubject(null);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div className="container">
      <h1 className="title">🚀 Placement Preparation Hub</h1>

      {/* Company Cards */}
      {!selectedCompany ? (
        <div id="companies" className="cards">
          <div className="card" onClick={() => handleCardClick("TCS")}>💼 TCS</div>
          <div className="card" onClick={() => handleCardClick("Infosys")}>💻 Infosys</div>
          <div className="card" onClick={() => handleCardClick("Wipro")}>🚀 Wipro</div>
          <div className="card" onClick={() => handleCardClick("Accenture")}>🌐 Accenture</div>
          <div className="card" onClick={() => handleCardClick("Capgemini")}>⚡ Capgemini</div>
        </div>
      ) : null}

      {/* Subjects */}
      {selectedCompany && !selectedSubject ? (
        <div id="subjects">
          <h2>{selectedCompany} Subjects</h2>
          <button 
            className="subject-btn back-link" 
            onClick={() => setSelectedCompany(null)}
          >
            ← Back
          </button>
          <div>
            {subjects.map((sub) => (
              <button
                key={sub}
                className="subject-btn"
                onClick={() => handleSubjectClick(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Questions */}
      {selectedCompany && selectedSubject ? (
        <div id="questions" className="question-box">
          <h2>{selectedCompany} - {selectedSubject}</h2>
          <button 
            className="subject-btn back-link" 
            onClick={() => setSelectedSubject(null)}
          >
            ← Back
          </button>
          <ul>
            {questionsData[selectedSubject].map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default CompanyQuestions;