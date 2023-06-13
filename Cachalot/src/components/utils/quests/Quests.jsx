import React from 'react';
import { styled } from "twin.macro";

// Components
import Navbar from "../../navbar/Navbar.jsx";

// Styled Components
import {
    MainContainer,
    Container
} from "../ui/GlobalStyle.js";

const QuestsContainer = styled(Container)``;
const Content = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
`

const Quests = () => {
    return (
        <MainContainer>
            <Navbar />
            <QuestsContainer>
                <Content>
                    <h1>Quests</h1>
                </Content>
            </QuestsContainer>
        </MainContainer>
    )
}

export default Quests;