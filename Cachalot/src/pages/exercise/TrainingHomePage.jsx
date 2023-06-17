import React, { useEffect, useState } from 'react';

// Context
import { useAuth } from "../../context/AuthContext.js";

// Components*
import Navbar from "../../components/navbar/Navbar.jsx";
import Loading from "../../components/utils/loading/Loading.jsx";
import BodyTraining from "./components/BodyTraining.jsx";
import AsideTraining from "./components/AsideTraining.jsx";

// Styled Components
import { MainContainer } from "../../components/utils/ui/GlobalStyle.js";
import {
    TrainingContainer,
    Content
} from "./styles/ExerciseHomePageStyle.js";
import loadXpCache from "../../utils/onLoading.js";
import ChatContainer from "../profile/components/profileComponents/subComponents/chat.jsx";

const TrainingHomePage = () => {
    // Context
    const auth = useAuth();
    // State
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(auth.currentUser instanceof Object || typeof auth.currentUser === "number") setIsLoading(false);
    }, [auth.currentUser])

    useEffect(() => {
        if(auth.currentUser !== null) {
            loadXpCache(auth.currentUser, setIsLoading)
        }
    }, [auth.currentUser]);

    if(isLoading){
        return <Loading />
    } else if(auth.currentUser instanceof Object) {
        return (
            <MainContainer>
                <Navbar />
                <TrainingContainer>
                    <Content>
                        <BodyTraining auth={auth} />
                        <AsideTraining auth={auth} />
                        <ChatContainer auth={auth} />
                    </Content>
                </TrainingContainer>
            </MainContainer>
        )
    } else if(typeof auth.currentUser === "number") {
        window.location.pathname = "/profile";
    }
}

export default TrainingHomePage;