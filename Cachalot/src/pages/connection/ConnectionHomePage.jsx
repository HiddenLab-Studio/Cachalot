import React from "react";

// Styled components
import {
    MainContainer
} from "../../components/utils/ui/GlobalStyle.js"

// Components
import Navbar from "../../components/navbar/Navbar.jsx";
import SignInUp from "./components/SignInUp.jsx";

const ConnectionHomePage = () => {
    return (
        <MainContainer>
            <Navbar />
            <SignInUp />
        </MainContainer>
    )
}

export default ConnectionHomePage;