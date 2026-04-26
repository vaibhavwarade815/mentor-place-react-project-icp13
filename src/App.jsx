import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const Dummy = ({ name }) => <h1 style={{textAlign:"center"}}>{name}</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/upload" element={<Dummy name="Resume Upload" />} />
        <Route path="/prep" element={<Dummy name="Placement Prep" />} />
        <Route path="/mock" element={<Dummy name="Mock Interview" />} />
        <Route path="/progress" element={<Dummy name="Progress Tracker" />} />
        <Route path="/career" element={<Dummy name="Career Guidance" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;