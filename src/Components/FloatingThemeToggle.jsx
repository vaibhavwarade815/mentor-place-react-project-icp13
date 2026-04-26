import { useTheme } from "../context/ThemeContext";

const FloatingThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="theme-fab" onClick={toggleTheme} title="Toggle theme">
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

export default FloatingThemeToggle;
