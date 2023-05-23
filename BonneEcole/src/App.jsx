import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components
import Home from "./components/Home/Home.jsx";

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);