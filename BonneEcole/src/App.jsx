// Important !
import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Scss
import "./App.scss"

// Functions

// Components
import { ThemeProvider } from "@emotion/react";
import Home from "./components/home/Home.jsx"

// Theme
import { Theme, themeLight, themeDark } from "./assets/theme.js";

function App(){
    const [theme, setTheme] = useState(Theme.loadTheme() === "light" ? "light" : "dark");

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme === "light" ? themeLight : themeDark}>
                <Routes>
                    <Route path={"/"} element={<Home setTheme={setTheme} />}></Route>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);