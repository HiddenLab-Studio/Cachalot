import React, { useState } from "react";
import {Link} from "react-router-dom";
import tw, {styled} from "twin.macro";

// Context
import {useAuth} from "../../context/AuthContext.js";
import {useCache} from "../../context/manager/cache/CacheProvider.js";

// Components
import Navbar from "../../components/navbar/Navbar.jsx"
import FullLoading from "../../components/utils/loading/FullLoading.jsx";

// Styled Components
import { MainContainer } from "../../components/utils/ui/GlobalStyle.js";
import {AsideContainer, BodyContainer, Content, HomeContainer} from "./HomeStyle.js";
import TrendingExercise from "../../components/cards/TrendingExercise.jsx";
import {InputNumberContainer} from "../exercise/styles/BodyTrainingStyle.js";
import {FaMinus, FaPlus} from "react-icons/fa";
import DescSpan from "../../components/utils/ui/DescSpan.jsx";
import Quest from "../../components/quest/Quest.jsx";
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
                <HomeContainer>
                    <Content>
                        <BodyContainer>
                            <div tw="flex flex-col">
                                <div tw="flex flex-row items-center gap-[8px]">
                                    <img tw="w-[38px] h-[38px]" src="../../../static/img/logo.png" alt="Flame"/>
                                    <h1>Bienvenue sur Cachalot</h1>
                                </div>
                                <DescSpan
                                    desc="Cachalot est une plateforme d'entrainement aux mathématiques et au français. Vous pouvez y trouver des exercices de mathématiques et de français mais aussi en créer et les partager avec la communauté.
                                     pas encore de compte ? Inscrivez-vous dès maintenant !"
                                />
                            </div>

                            <div className="trending__container">
                                <div tw="flex flex-row items-center gap-[8px]">
                                    <img tw="w-[38px] h-[38px]" src="../../../static/img/gif/flame.gif" alt="Flame"/>
                                    <h1>Exercices du moment</h1>
                                </div>
                            </div>
                            <TrendingExercise amount={3} />
                        </BodyContainer>


                        <AsideContainer >
                            <ButtonCard
                                title= "Mes classes"
                                desc= "Apprendre à plusieurs, c'est encore mieux !"
                                imageURL= "../../../../../static/img/icons/class.png"
                                link= "/my-class"
                                alt= "Your classes"
                            />
                            <ButtonCard
                                title="Entrainements"
                                desc="Rien de mieux que de s'entrainer pour progresser !"
                                imageURL="../../../../static/img/icons/dumbbell.png"
                                alt="Training"
                                link="/training"
                            />
                            <ButtonCard
                                title= "Ligue"
                                desc= "Affronte la communauté et gagne des récompenses !"
                                imageURL= "../../../../../static/img/icons/sword.png"
                                link= "/ranked"
                                alt= "League"
                            />
                            <ButtonCard
                                title="Voir les exercices"
                                desc="Découvre les exercices réalisés par la communauté"
                                imageURL="../../../../static/img/icons/books.png"
                                alt="Exercise catalog"
                                link="/exercise/catalog"/>
                            <ButtonCard
                                title="Créer un exercice"
                                desc="Créer ton propre exercice et partage le avec la communauté"
                                imageURL="../../../../static/img/icons/exercise.png"
                                alt="Create an exercise"
                                link="/exercise/create" />
                        </AsideContainer>

                    </Content>
                </HomeContainer>
            </MainContainer>
        )
    } else {
        if(isLoading) {
            return <FullLoading setIsLoading={setIsLoading} />
        } else {
            return (
                <MainContainer>
                    <Navbar/>
                    <HomeContainer>
                        <Content>
                            <BodyContainer>
                                <div tw="flex flex-col">
                                    <div tw="flex flex-row items-center gap-[8px]">
                                        <img tw="w-[38px] h-[38px]" src="../../../static/img/logo.png" alt="Flame"/>
                                        <h1>Bienvenue sur Cachalot</h1>
                                    </div>
                                    <DescSpan
                                        desc="Cachalot est une plateforme d'entrainement aux mathématiques et au français. Vous pouvez y trouver des exercices de mathématiques et de français mais aussi en créer et les partager avec la communauté.
                                     pas encore de compte ? Inscrivez-vous dès maintenant !"
                                    />
                                </div>

                                <div className="trending__container">
                                    <div tw="flex flex-row items-center gap-[8px]">
                                        <img tw="w-[38px] h-[38px]" src="../../../static/img/gif/flame.gif" alt="Flame"/>
                                        <h1>Exercices du moment</h1>
                                    </div>
                                </div>
                                <TrendingExercise amount={3} />
                            </BodyContainer>


                            <AsideContainer >
                                <Quest amountOfQuestToDisplay={3} />
                                <ButtonCard
                                    title= "Mes classes"
                                    desc= "Apprendre à plusieurs, c'est encore mieux !"
                                    imageURL= "../../../../../static/img/icons/class.png"
                                    link= "/my-class"
                                    alt= "Your classes"
                                />
                                <ButtonCard
                                    title="Créer un exercice"
                                    desc="Créer ton propre exercice et partage le avec la communauté"
                                    imageURL="../../../../static/img/icons/exercise.png"
                                    alt="Create an exercise"
                                    link="/exercise/create" />
                                <ButtonCard
                                    title="Voir les exercices"
                                    desc="Découvre les exercices réalisés par la communauté"
                                    imageURL="../../../../static/img/icons/books.png"
                                    alt="Exercise catalog"
                                    link="/exercise/catalog"/>
                            </AsideContainer>

                        </Content>
                    </HomeContainer>
                </MainContainer>
            )
        }
    }

}

//<ThemeChanger setTheme={props.setTheme} />

export default HomePage;