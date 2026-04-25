import React, { useState } from "react";
import "../styles/Mockinterview.css";

// ✅ Question Bank
const questionBank = {
  aptitude: [
    { q: "2 + 2 = ?", options: ["3", "4", "5"], answer: "4" },
    { q: "5 × 3 = ?", options: ["10", "15", "20"], answer: "15" },
    { q: "10 / 2 = ?", options: ["2", "5", "8"], answer: "5" }
  ],
  dsa: [
    { q: "Stack follows?", options: ["FIFO", "LIFO"], answer: "LIFO" },
    { q: "Queue follows?", options: ["FIFO", "LIFO"], answer: "FIFO" }
  ],
  interview: [
    { q: "Tell me about yourself", options: ["Good", "Bad"], answer: "Good" }
  ],
  more: [
    { q: "HTML stands for?", options: ["Markup", "Programming"], answer: "Markup" }
  ]
};

const MockInterview = () => {
  const [step, setStep] = useState("category");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Select Category
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setStep("quiz");
    setIndex(0);
    setScore(0);
  };

  // Handle Answer
  const handleAnswer = (option) => {
    const questions = questionBank[selectedCategory];

    if (option === questions[index].answer) {
      setScore((prev) => prev + 1);
    }

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      // Finish
      const finalScore =
        option === questions[index].answer ? score + 1 : score;

      setScore(finalScore);
      setStep("result");

      // ✅ Save to localStorage
      localStorage.setItem("lastScore", finalScore);
    }
  };

  // Rank Logic
  const getRank = () => {
    if (score <= 1) return "Beginner";
    if (score <= 2) return "Intermediate";
    return "Expert";
  };

  // ================= UI =================

  // 🟦 CATEGORY PAGE
  if (step === "category") {
    return (
      <div className="mock-container">
        <h2>Select Category</h2>

        <div className="cards">
          {Object.keys(questionBank).map((cat) => (
            <div
              key={cat}
              className="card"
              onClick={() => handleCategorySelect(cat)}
            >
              {cat.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 🟩 QUIZ PAGE
  if (step === "quiz") {
    const questions = questionBank[selectedCategory];
    const currentQ = questions[index];

    return (
      <div className="mock-container">
        <h2>{selectedCategory.toUpperCase()} Quiz</h2>

        <p>
          Question {index + 1} / {questions.length}
        </p>

        <div className="question-box">{currentQ.q}</div>

        <div className="options">
          {currentQ.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 🟨 RESULT PAGE
  if (step === "result") {
    return (
      <div className="mock-container">
        <h2>Interview Completed 🎉</h2>

        <h3>Score: {score}</h3>
        <h3>Rank: {getRank()}</h3>

        <button onClick={() => setStep("category")}>
          Try Again
        </button>
      </div>
    );
  }
};

export default MockInterview;