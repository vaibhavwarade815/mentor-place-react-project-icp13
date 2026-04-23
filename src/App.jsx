import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const Dummy = ({ name }) => <h1 style={{textAlign:"center"}}>{name}</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* Pages */}
        <Route path="/upload" element={<Dummy name="Resume Upload Page" />} />
        <Route path="/preparation" element={<Dummy name="Placement Prep Page" />} />
        <Route path="/mock" element={<Dummy name="Mock Interview Page" />} />
        <Route path="/progress" element={<Dummy name="Progress Tracker Page" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;