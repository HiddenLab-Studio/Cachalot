import React, {useEffect} from 'react';
import { styled } from "twin.macro";

// Context
import {useAuth} from "../../context/AuthContext.js";
import {useCache} from "../../context/manager/cache/CacheProvider.js";

// Components
import Navbar from "../../components/navbar/Navbar.jsx";
import FullLoading from "../../components/utils/loading/FullLoading.jsx";
import ConnectionHomePage from "../connection/ConnectionHomePage.jsx";

// Styled Components
import {
    MainContainer,
    Container
} from "../../components/utils/ui/GlobalStyle.js";
import Quest from "../../components/quest/Quest.jsx";

const QuestsContainer = styled(Container)``;
const Content = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  max-width: 1024px;
  margin: 0 auto;
`

const QuestHomePage = () => {
    // Context
    const auth = useAuth();
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = React.useState(true);

    if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage />
    } else {
        if(isLoading) {
            return <FullLoading setIsLoading={setIsLoading} />
        } else {

            const userQuest = cache.questCache.getCache();

            return (
                <MainContainer>
                    <Navbar />
                    <QuestsContainer>
                        <Content>
                            <Quest amountOfQuestToDisplay={-1} />
                        </Content>
                    </QuestsContainer>
                </MainContainer>
            )
        }
    }
}

export default QuestHomePage;