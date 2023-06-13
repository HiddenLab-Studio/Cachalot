import React from 'react';
import { styled } from "twin.macro";

// Components
import Navbar from "../../navbar/Navbar.jsx";

// Styled Components
import {
    Container,
    MainContainer
} from "../ui/GlobalStyle.js";

const AboutContainer = styled(Container)``;
const Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px;
`

const About = () => {
    return (
        <MainContainer>
            <Navbar />
            <AboutContainer>
                <Content>
                    <h1>About</h1>
                </Content>
            </AboutContainer>
        </MainContainer>
    )
}

export default About;