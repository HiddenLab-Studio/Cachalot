import React from "react";
import tw, { styled } from "twin.macro";

// Context
import { useAuth } from "../../context/AuthContext.js";

// Styles
const Container = styled.main`
  ${tw`flex flex-row min-h-[100vh]`};

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`

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