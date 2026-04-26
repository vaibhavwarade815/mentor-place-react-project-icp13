import React, { useState, useEffect } from "react";
import "./MockInterview.css";

const categories = [
  { name: "Aptitude 🧠", key: "aptitude", subtitle: "Logic, math, and reasoning" },
  { name: "DSA 💻", key: "dsa", subtitle: "Algorithms, structures, and patterns" },
  { name: "Interview 🎤", key: "interview", subtitle: "Behavioural and communication practice" },
  { name: "CS Fundamentals 📚", key: "cs", subtitle: "Core theory and systems knowledge" },
];

const questionsByCategory = {
  aptitude: [
    { question: "What is mean, median, and mode?", answer: "average" },
    { question: "If x + 5 = 12, what is x?", answer: "7" },
    { question: "What is 15% of 200?", answer: "30" },
    { question: "Solve: 8 × 7.", answer: "56" },
    { question: "What is the next number in 2, 4, 8, 16?", answer: "32" },
    { question: "What is a ratio?", answer: "comparison" },
    { question: "What is a simple interest formula?", answer: "principal" },
    { question: "What is 100 in binary?", answer: "1100100" },
    { question: "How many sides does a hexagon have?", answer: "6" },
    { question: "What is 5 squared?", answer: "25" },
  ],
  dsa: [
    { question: "What is a stack?", answer: "lifo" },
    { question: "What is a queue?", answer: "fifo" },
    { question: "Explain binary search.", answer: "log n" },
    { question: "What is the time complexity of quicksort (average)?", answer: "n log n" },
    { question: "What is a linked list?", answer: "nodes" },
    { question: "What does DFS stand for?", answer: "depth" },
    { question: "What does BFS stand for?", answer: "breadth" },
    { question: "What is a hash table used for?", answer: "mapping" },
    { question: "What is a tree data structure?", answer: "hierarchy" },
    { question: "What is a graph?", answer: "nodes" },
  ],
  interview: [
    { question: "How would you introduce yourself in an interview?", answer: "experience" },
    { question: "What is your biggest strength?", answer: "strength" },
    { question: "Why do you want this job?", answer: "interest" },
    { question: "How do you handle pressure?", answer: "calm" },
    { question: "Describe a time you worked in a team.", answer: "team" },
    { question: "What are your career goals?", answer: "growth" },
    { question: "How do you learn new skills?", answer: "practice" },
    { question: "What motivates you?", answer: "challenge" },
    { question: "How do you solve problems?", answer: "analysis" },
    { question: "What is your biggest achievement?", answer: "achievement" },
  ],
  cs: [
    { question: "What is OOP?", answer: "objects" },
    { question: "What is encapsulation?", answer: "hide" },
    { question: "What is inheritance?", answer: "reuse" },
    { question: "What is polymorphism?", answer: "many forms" },
    { question: "What is a database?", answer: "storage" },
    { question: "What is an operating system?", answer: "system" },
    { question: "What is a compiler?", answer: "translate" },
    { question: "What is networking?", answer: "connect" },
    { question: "What is an algorithm?", answer: "steps" },
    { question: "What is a byte?", answer: "8 bits" },
  ],
};

export default function MockInterview() {
  const [category, setCategory] = useState(null);
  const [categoryLabel, setCategoryLabel] = useState("");
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [time, setTime] = useState(15); // ⏱️ 15 sec timer

  const [savedData, setSavedData] = useState(
    JSON.parse(localStorage.getItem("mockData")) || []
  );

  const questions = category ? questionsByCategory[category] : [];

  // 🎯 CHECK ANSWER
  const checkAnswer = () => {
    const question = questions[index];
    if (!question) return;

    const answer = question.answer.toLowerCase().trim();
    const userInput = input.toLowerCase().trim();

    if (userInput && answer && userInput.includes(answer)) {
      setScore((prev) => prev + 1);
    }
  };

  const finishQuiz = () => {
    const rank =
      score >= 8 ? "🏆 Expert" : score >= 5 ? "🔥 Average" : "📉 Beginner";

    const data = {
      date: new Date().toLocaleString(),
      score,
      rank,
      category: categoryLabel,
    };

    const updated = [...savedData, data];
    setSavedData(updated);
    localStorage.setItem("mockData", JSON.stringify(updated));

    setCompleted(true);
  };

  const handleNext = (skip = false) => {
    if (!skip) checkAnswer();

    setInput("");
    setTime(15);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      finishQuiz();
    }
  };

  // ⏱️ TIMER LOGIC
  useEffect(() => {
    if (completed || !category) return;
    if (time === 0) {
      const id = setTimeout(() => handleNext(true), 0);
      return () => clearTimeout(id);
    }
    const timer = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, completed, category]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    checkAnswer();
    finishQuiz();
  };

  const reset = () => {
    setCategory(null);
    setCategoryLabel("");
    setIndex(0);
    setScore(0);
    setCompleted(false);
    setTime(15);
  };

  // 🟣 CATEGORY SCREEN
  if (!category) {
    return (
      <div className="container">
        <h1 className="title">🚀 Mock Interview</h1>
        <div className="card-grid">
          {categories.map((c, i) => (
            <div
              key={i}
              className="card"
              onClick={() => {
                setCategory(c.key);
                setCategoryLabel(c.name);
              }}
            >
              <h2>{c.name}</h2>
              <p className="card-subtitle">{c.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 🟢 QUIZ SCREEN
  if (!completed) {
    return (
      <div className="container">
        <h2>{categoryLabel}</h2>

        <div className="quiz-box">
          <div className="timer">⏱️ {time}s</div>

          <h3>
            Q{index + 1}. {questions[index].question}
          </h3>

          {/* ✍️ INPUT BOX */}
          <textarea
            placeholder="Type your answer..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="btn-group">
            <button onClick={() => handleNext()}>Next ➡️</button>
            <button onClick={() => handleNext(true)}>Skip ⏭️</button>
            <button onClick={handleSubmit}>Submit ✅</button>
          </div>
        </div>
      </div>
    );
  }

  // 🔵 RESULT SCREEN
  return (
    <div className="container assessment-page">
      <div className="assessment-card">
        <div className="assessment-header">
          <h1>Assessment Completed</h1>
          <p>Review your performance and saved quiz history.</p>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "100%" }} />
        </div>

        <div className="result-card">
          <p className="result-status">Completed</p>
          <h2>{score}/10</h2>
          <p className="result-subtitle">You completed the mock interview quiz.</p>

          <div className="action-buttons">
            <button className="pill-button" onClick={reset}>
              Restart
            </button>
            <button className="pill-button secondary">Your Data</button>
          </div>
        </div>
      </div>

      <div className="saved-data-section">
        <h3>Saved Quiz Data:</h3>
        {savedData.length === 0 ? (
          <p className="empty-note">No saved history yet.</p>
        ) : (
          savedData.map((d, i) => (
            <div key={i} className="saved-data-card">
              <p className="saved-date">{d.date}</p>
              <p>{d.category}</p>
              <p>Score: {d.score}</p>
              <p>{d.rank}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}