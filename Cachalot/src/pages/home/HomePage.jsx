import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

// Context
import {useAuth} from "../../context/AuthContext.js";
import loadXpCache from "../../utils/onLoading.js";

// Components
import Navbar from "../../components/navbar/Navbar.jsx"
import TrendingExercise from "../../components/cards/TrendingExercise.jsx";
import FullLoading from "../../components/utils/loading/FullLoading.jsx";

// Styled Components
import { MainContainer } from "../../components/utils/ui/GlobalStyle.js";
import {AsideContainer, ContentContainer, MainSection} from "./HomeStyle.js";
import xpCacheManager from "../../context/manager/cache/xpCacheManager.js";

const HomePage = () => {
    // State
    const [isLoading, setIsLoading] = useState(false);

    const auth = useAuth();

    useEffect(() => {
        if(auth.currentUser instanceof Object) {
            loadXpCache(auth.currentUser, setIsLoading)
        }
    }, [auth.currentUser]);

    if(isLoading) {
        return <FullLoading />
    } else {
        return (
            <MainContainer>
                <Navbar/>
                <MainSection>
                    <ContentContainer>
                        <TrendingExercise amount={3} />
                    </ContentContainer>
                    <AsideContainer>
                        <h1>aside content</h1>
                        <div>
                            <h1>aside content</h1>
                            <Link to="/my-class">
                                <h1>MyCLASS</h1>
                            </Link>
                        </div>
                    </AsideContainer>
                </MainSection>
            </MainContainer>
        )
    }

}

//<ThemeChanger setTheme={props.setTheme} />

export default HomePage;