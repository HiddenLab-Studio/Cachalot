import React from 'react';
import { styled } from "twin.macro";

// Components
import Navbar from "../../components/navbar/Navbar.jsx";

// Styled Components
import {
    MainContainer
} from "../../components/utils/ui/GlobalStyle.js";
const DivisionContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0 25px 256px;

  // Responsive padding for navbar
  @media (min-width: 768px) and (max-width: 1200px) {
    padding: 25px 0 25px 128px;
  }

  @media (max-width: 768px) {
    padding: 25px;
  }
`

const DivisionHomePage = () => {
    return (
        <MainContainer>
            <Navbar />
            <DivisionContainer>
                <h1>Ranked</h1>
            </DivisionContainer>
        </MainContainer>
    )
}

export default DivisionHomePage;