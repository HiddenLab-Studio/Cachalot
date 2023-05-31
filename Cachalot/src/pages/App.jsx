import React from "react"
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import { ThemeProvider } from "@emotion/react";
import Home from "./home/Home.jsx";

// Context
import { AuthProvider } from "../context/AuthContext.js";

// Scss
import "./App.scss"

// Theme
import { Theme, themeLight, themeDark } from "../utils/theme.js";
import Exercise from "./exercise/Exercise.jsx";

const App = () => {
    const [theme, setTheme] = useState(Theme.loadTheme() === "light" ? "light" : "dark");

    return (
        <AuthProvider value={{}}>
            <BrowserRouter>
                <ThemeProvider theme={theme === "light" ? themeLight : themeDark}>
                    <Routes>
                        <Route path={"/"} element={<Home setTheme={setTheme}/>}></Route>
                        <Route path={"/exercise"} element={<Exercise setTheme={setTheme}/>}></Route>
                        <Route path={"/ranked"} element={<Home setTheme={setTheme}/>}></Route>
                        <Route path={"/quest"} element={<Home setTheme={setTheme}/>}></Route>
                        <Route path={"/profile"} element={<Home setTheme={setTheme}/>}></Route>
                        <Route path={"/settings"} element={<Home setTheme={setTheme}/>}></Route>
                        <Route path={"/about"} element={<Home setTheme={setTheme}/>}></Route>
                        <Route path={"/exercise/:id"} element={<Exercise setTheme={setTheme}/>}></Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </AuthProvider>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);