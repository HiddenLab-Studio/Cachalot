import React, {useEffect} from 'react';
import { styled } from "twin.macro";

// Context
import {useAuth} from "../../../context/AuthContext.js";
import {useCache} from "../../../context/manager/cache/CacheProvider.js";

// Components
import Navbar from "../../navbar/Navbar.jsx";
import FullLoading from "../loading/FullLoading.jsx";
import ConnectionHomePage from "../../../pages/connection/ConnectionHomePage.jsx";

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
            console.log(userQuest);

            return (
                <MainContainer>
                    <Navbar />
                    <QuestsContainer>
                        <Content>
                            <h1>Quests</h1>
                            {
                                userQuest.currentQuest.map((quest, index) => {
                                    return (
                                        <div key={index}>
                                            <h2>{quest.name}</h2>
                                            <p>{quest.type}</p>
                                            <p>{quest.reward}</p>
                                            <p>{quest.current}/{quest.amount}</p>
                                        </div>
                                    )
                                })
                            }
                        </Content>
                    </QuestsContainer>
                </MainContainer>
            )
        }
    }
}

export default Quests;