import React from "react";

// Styles
import {
    Container
} from "./ExerciseHomePageStyle.js";

// Components
import Navbar from "../../components/navbar/Navbar.jsx"
import MathExercise from "./components/MathExercise.jsx";

const ExerciseHomePage = () => {


    /* TODO:
    *   - Revoir les composants et le css
    */
    return (
        <Container>
            <Navbar/>
            <MathExercise/>
        </Container>
    )
}

export default ExerciseHomePage;