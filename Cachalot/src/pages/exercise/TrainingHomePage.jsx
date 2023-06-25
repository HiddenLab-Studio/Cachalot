import React, { useState } from 'react';

// Context
import { useAuth } from "../../context/AuthContext.js";
import { useCache } from "../../context/manager/cache/CacheProvider.js";

// Components*
import Navbar from "../../components/navbar/Navbar.jsx";
import BodyTraining from "./components/BodyTraining.jsx";
import AsideTraining from "./components/AsideTraining.jsx";
import ChatContainer from "../profile/components/profileComponents/subComponents/chat.jsx";
import ConnectionHomePage from "../connection/ConnectionHomePage.jsx";
import FullLoading from "../../components/utils/loading/FullLoading.jsx";

// Styled Components
import { MainContainer } from "../../components/utils/ui/GlobalStyle.js";
import {
    TrainingContainer,
    Content
} from "./styles/ExerciseHomePageStyle.js";


const TrainingHomePage = () => {
    // Context
    const auth = useAuth();
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = useState(!cache.isUserCached);

    if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage />
    } else {
        if (isLoading) {
            return <FullLoading setIsLoading={setIsLoading} />
        } else {
            return (
                <MainContainer>
                    <Navbar />
                    <TrainingContainer>
                        <Content>
                            <BodyTraining auth={auth} />
                            <AsideTraining auth={auth} />
                        </Content>
                    </TrainingContainer>
                </MainContainer>
            )
        }
    }
}

//<ChatContainer auth={auth} />

export default TrainingHomePage;