import React, { useState } from "react";
import "../styles/CompanyQuestions.css";


const CompanyQuestions = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const companies = ["TCS", "Infosys", "Wipro", "Accenture", "Capgemini"];
  const subjects = ["C", "C++", "Java", "Python", "SQL", "Aptitude"];

  const data = {
    Java: ["JVM?", "JDK?", "OOP?", "Inheritance?", "Polymorphism?", "Encapsulation?", "Abstraction?", "Exception?", "Threads?", "Collections?", "ArrayList?", "Interface?", "Abstract?", "Overloading?", "Overriding?"],
    C: ["Pointer?", "Structure?", "malloc?", "Array?", "Recursion?", "Function?", "Null pointer?", "File handling?", "DMA?", "Stack vs Heap?", "Macro?", "Union?", "typedef?", "Seg fault?", "Preprocessor?"],
    "C++": ["OOP?", "Class?", "Constructor?", "Destructor?", "Inheritance?", "Polymorphism?", "Encapsulation?", "Operator overloading?", "Virtual?", "Friend?", "Namespace?", "Template?", "STL?", "C vs C++?", "Abstraction?"],
    Python: ["Python?", "List?", "Tuple?", "Dict?", "Set?", "Function?", "Lambda?", "OOP?", "Module?", "Package?", "Exception?", "Loop?", "Recursion?", "File handling?", "Inheritance?"],
    SQL: ["DBMS?", "SQL?", "Primary key?", "Foreign key?", "Join?", "Types?", "Normalization?", "Index?", "View?", "Procedure?", "Trigger?", "Transaction?", "ACID?", "Group by?", "Having?"],
    Aptitude: ["Time Work", "Speed", "Profit", "SI", "CI", "Ratio", "Probability", "Permutation", "Number", "Average", "Percentage", "Mixture", "Calendar", "Clock", "DI"]
  };
  return (
    <div>
      <h1 className="title">🚀 Placement Preparation Hub</h1>

      {/* Company Cards */}
      <div className="cards">
        {companies.map((company) => (
          <div
            key={company}
            className="card"
            onClick={() => {
              setSelectedCompany(company);
              setSelectedSubject(null);
            }}
          >
            💼 {company}
          </div>
        ))}
      </div>

      {/* Subjects */}
      {selectedCompany && (
        <div id="subjects">
          <h2>{selectedCompany} Subjects</h2>
          {subjects.map((sub) => (
            <button
              key={sub}
              className="subject-btn"
              onClick={() => setSelectedSubject(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Questions */}
      {selectedSubject && (
        <div className="question-box">
          <h2>
            {selectedCompany} - {selectedSubject}
          </h2>
          <ul>
            {data[selectedSubject].map((q, index) => (
              <li key={index}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompanyQuestions;