import React from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";

// Components
import Navbar from "../navbar/Navbar.jsx";

const Container = styled.main`
    ${tw`min-h-[100vh]`};
    background-color: ${props => props.theme.background};
    transition: all ease 500ms;
`;

const Home = (props) => {
    return (
        <Container>
            <Navbar setTheme={props.setTheme} />
        </Container>
    )
}

export default Home;