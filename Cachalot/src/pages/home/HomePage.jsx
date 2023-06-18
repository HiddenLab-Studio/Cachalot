import React, { useState } from "react";
import {Link} from "react-router-dom";

// Context
import {useAuth} from "../../context/AuthContext.js";
import {useCache} from "../../context/manager/cache/CacheProvider.js";

// Components
import Navbar from "../../components/navbar/Navbar.jsx"
import TrendingExercise from "../../components/cards/TrendingExercise.jsx";
import FullLoading from "../../components/utils/loading/FullLoading.jsx";

// Styled Components
import { MainContainer } from "../../components/utils/ui/GlobalStyle.js";
import {AsideContainer, ContentContainer, MainSection} from "./HomeStyle.js";

const HomePage = () => {
    // Context
    const auth = useAuth();
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = useState(!cache.isUserCached);

    // auth.currentUser = -1 if user is not logged in
    // auth.currentUser = Object if user is logged in

    if(typeof auth.currentUser === "number") {
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
    } else {
        if(isLoading) {
            return <FullLoading setIsLoading={setIsLoading} />
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

}

//<ThemeChanger setTheme={props.setTheme} />

export default HomePage;