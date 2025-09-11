import * as React from "react";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";

// --- Icons ---
import { MoonStarIcon } from "@/components/tiptap-icons/moon-star-icon";
import { SunIcon } from "@/components/tiptap-icons/sun-icon";

export function ThemeToggle() {
  // Load theme synchronously to prevent flash
  const getInitialTheme = () => {
    try {
      const savedTheme = localStorage.getItem("tiptap-theme");
      if (savedTheme) {
        const isDark = savedTheme === "dark";
        // Apply theme immediately
        document.documentElement.classList.toggle("dark", isDark);
        return isDark;
      }
    } catch (error) {
      console.error("Failed to load theme from localStorage:", error);
    }
    // Fallback to system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = mediaQuery.matches;
    document.documentElement.classList.toggle("dark", isDark);
    return isDark;
  };

  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(getInitialTheme);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    // Save theme to localStorage
    localStorage.setItem("tiptap-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((isDark) => !isDark);

  return (
    <Button
      onClick={toggleDarkMode}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      data-style="ghost"
    >
      {isDarkMode ? (
        <MoonStarIcon className="tiptap-button-icon" />
      ) : (
        <SunIcon className="tiptap-button-icon" />
      )}
    </Button>
  );
}
