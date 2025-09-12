import { createContext, useContext, useEffect, useState } from "react";

// create context

const ThemeContext = createContext();

// Provider Component

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

return (
    <ThemeContext.Provider value={{ theme, toggleTheme} }>
        {children}
    </ThemeContext.Provider>
)
}
// Custom hook for easy access
export function useTheme() {
    return useContext(ThemeContext);
}