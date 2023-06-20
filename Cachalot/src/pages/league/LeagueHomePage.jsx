import React, { useState } from 'react';
import { styled } from "twin.macro";

// Context
import { useAuth } from "../../context/AuthContext.js";
import { useCache } from "../../context/manager/cache/CacheProvider.js";

// Components*
import Navbar from "../../components/navbar/Navbar.jsx";
import ChatContainer from "../profile/components/profileComponents/subComponents/chat.jsx";
import ConnectionHomePage from "../connection/ConnectionHomePage.jsx";
import FullLoading from "../../components/utils/loading/FullLoading.jsx";

// Styled Components
import { MainContainer, Container } from "../../components/utils/ui/GlobalStyle.js";
import MatchContainer from "./components/MatchLeague.jsx";

const LeagueContainer = styled(Container)``;
const Content = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  overflow-y: hidden;
`;

const LeagueHomePage = () => {
    // Context
    const auth = useAuth();
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = useState(!cache.isUserCached);

    if (typeof auth.currentUser === "number") {
        return <ConnectionHomePage />
    } else {
        if (isLoading) {
            return <FullLoading setIsLoading={setIsLoading} />
        } else {
            return (
                <MainContainer>
                    <Navbar />
                    <LeagueContainer>
                        <Content>
                           <MatchContainer auth={auth} />
                        </Content>
                    </LeagueContainer>
                </MainContainer>
            )
        }
    }
}

export default LeagueHomePage;