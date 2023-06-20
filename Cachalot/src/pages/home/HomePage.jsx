import React, { useState } from "react";
import {Link} from "react-router-dom";
import tw from "twin.macro";

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
import ButtonCard from "../../components/cards/ButtonCard.jsx";

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
                            <div tw="flex flex-col gap-[16px]">
                                <ButtonCard
                                    title="Créer un exercice"
                                    desc="Créer ton propre exercice et partage le avec la communauté"
                                    imageURL="../../../../static/img/icons/exercise.png"
                                    alt="Create an exercise"
                                    link="/exercise/create" />
                                <ButtonCard
                                    title= "Ligue"
                                    desc= "Affronte la communauté et gagne des récompenses !"
                                    imageURL= "../../../../../static/img/icons/sword.png"
                                    link= "/ranked"
                                    alt= "League"
                                />
                                <ButtonCard
                                    title= "Rejoindre une classe"
                                    desc= "Apprendre à plusieurs, c'est encore mieux !"
                                    imageURL= "../../../../../static/img/icons/class.png"
                                    link= "/class"
                                    alt= "Join a class"
                                />
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