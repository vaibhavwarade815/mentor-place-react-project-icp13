import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import Home            from "./views/Home/Home";
import Dashboard       from "./views/Dashboard/Dashboard";
import MockInterview   from "./views/MockInterview/MockInterview";
import Profile         from "./views/Profile/Profile";
import Resources       from "./views/Resources/Resources";
import InterviewTips   from "./views/InterviewTips/InterviewTips";
import AptitudePractice from "./views/AptitudePractice/AptitudePractice";
import DSARoadmap      from "./views/DSARoadmap/DSARoadmap";
import CompanyGuides   from "./views/CompanyGuides/CompanyGuides";
import PlacementFAQs   from "./views/PlacementFAQs/PlacementFAQs";
import Community       from "./views/Community/Community";
import PlacementPrepration from "./views/PlacementPrepration/PlacementPrepration";
import ResumeUpload    from "./views/ResumeUpload/Resumeupload";
import ResumeAnalysis  from "./views/ResumeAnalysis/ResumeAnalysis";
import CompanyQuestions from "./views/CompanyQuestions/CompanyQuestions";

/* ── Default user (auto-logged in for demo) ── */
const DEFAULT_USER = {
  name: "Aksha Student",
  branch: "CSE",
  year: "3rd Year",
  skills: "React, DSA, Python",
};

const DEFAULT_COMPLETED = {
  resume: false, prep: false, mock: false,
  progress: false, career: false, community: false,
};

/* ── Protected Route ── */
const Protected = ({ form, children }) =>
  form ? children : <Navigate to="/" replace />;

/* ── Placeholder page ── */
const Placeholder = ({ name }) => (
  <div style={{
    minHeight: "100vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    background: "var(--bg)", gap: 16,
  }}>
    <span style={{ fontSize: 48 }}>{name.split(" ")[0]}</span>
    <h2 style={{ color: "var(--text-heading)", margin: 0 }}>{name.slice(name.indexOf(" ") + 1)} — Coming Soon</h2>
    <p style={{ color: "var(--text-muted)", fontSize: 14 }}>This feature is under development.</p>
  </div>
);

export default function App() {
  const [form, setForm]           = useState(DEFAULT_USER);
  const [completed, setCompleted] = useState(DEFAULT_COMPLETED);

  const onLogout = () => setForm(null);
  const onLogin  = (userData) => setForm(userData || DEFAULT_USER);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/"    element={<Home form={form} onLogin={onLogin} />} />
          <Route path="/home" element={<Home form={form} onLogin={onLogin} />} />

          {/* Protected */}
          <Route path="/dashboard" element={
            <Protected form={form}>
              <Dashboard form={form} completed={completed} setCompleted={setCompleted} onLogout={onLogout} />
            </Protected>
          } />
          <Route path="/profile" element={
            <Protected form={form}>
              <Profile form={form} setForm={setForm} completed={completed} />
            </Protected>
          } />
          <Route path="/resources" element={
            <Protected form={form}><Resources form={form} /></Protected>
          } />
          <Route path="/resources/interview-tips" element={
            <Protected form={form}><InterviewTips form={form} /></Protected>
          } />
          <Route path="/resources/aptitude" element={
            <Protected form={form}><AptitudePractice form={form} /></Protected>
          } />
          <Route path="/resources/dsa" element={
            <Protected form={form}><DSARoadmap form={form} /></Protected>
          } />
          <Route path="/resources/companies" element={
            <Protected form={form}><CompanyGuides form={form} /></Protected>
          } />
          <Route path="/resources/faqs" element={
            <Protected form={form}><PlacementFAQs form={form} /></Protected>
          } />
          <Route path="/community" element={
            <Protected form={form}><Community form={form} onLogout={onLogout} /></Protected>
          } />
          <Route path="/mock"    element={<MockInterview />} />
          <Route path="/prep"    element={<PlacementPrepration />} />
          <Route path="/upload"  element={<ResumeUpload />} />
          <Route path="/resume-analysis" element={<ResumeAnalysis />} />
          <Route path="/company-questions" element={<CompanyQuestions />} />
          <Route path="/progress" element={<Placeholder name="📊 Progress Tracker" />} />
          <Route path="/career"   element={<Placeholder name="🚀 Career Guidance" />} />
          <Route path="*"         element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
