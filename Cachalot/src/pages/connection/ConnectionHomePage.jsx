import React from "react";
import tw, { styled } from "twin.macro";

// Styled components
import {
    Container
} from "../../components/ui/GlobalStyle.js"

// Components
import Navbar from "../../components/navbar/Navbar.jsx";
import SignInUp from "./components/SignInUp.jsx";

const ConnectionHomePage = () => {
    return (
        <Container>
            <Navbar />
            <SignInUp />
        </Container>
    )

}

export default ConnectionHomePage;