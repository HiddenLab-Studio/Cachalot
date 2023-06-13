import React from "react"
import { useState } from "react";
import { createRoot } from "react-dom/client";

// Components
import { ThemeProvider } from "@emotion/react";

// Context
import { AuthProvider } from "../context/AuthContext.js";
import { CacheProvider } from "../context/cache/CacheManager.js";

// Scss
import "./App.scss"

// Theme
import { Theme, themeLight, themeDark } from "../utils/theme.js";
import BrowserRouter from "../router/BrowserRouter.jsx";

const App = () => {
    const [theme, setTheme] = useState(Theme.loadTheme() === "light" ? "light" : "dark");

    return (
        <AuthProvider>
            <CacheProvider>
                <ThemeProvider theme={theme === "light" ? themeLight : themeDark}>
                    <BrowserRouter />
                </ThemeProvider>
            </CacheProvider>
        </AuthProvider>
    )
}

/*
            <ThemeProvider theme={theme === "light" ? themeLight : themeDark}>
                <BrowserRouter />
            </ThemeProvider>
 */

const root = createRoot(document.getElementById("root"));
root.render(<App />);