import { useTheme } from "../../context/ThemeContext";
import "./FloatingThemeToggle.css";

const FloatingThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className={`ftg-btn ${isDark ? "ftg-dark" : "ftg-light"}`}
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      <span className="ftg-track">
        <span className="ftg-thumb">
          {isDark ? "🌙" : "☀️"}
        </span>
      </span>
      <span className="ftg-label">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
};

export default FloatingThemeToggle;
