import tw, { styled } from "twin.macro";

// Components
import Navbar from "../../components/navbar/Navbar.jsx"
import {AsideContainer, ContentContainer, MainContainer, MainSection} from "./HomeStyle.js";
import TrendingExercise from "../../components/cards/TrendingExercise.jsx";



const HomePage = () => {

    return (
        <MainContainer>
            <Navbar/>
            <MainSection>
                <ContentContainer>
                    <TrendingExercise/>
                </ContentContainer>
                <AsideContainer>
                    <h1>aside content</h1>
                </AsideContainer>
            </MainSection>
        </MainContainer>
    )
}

//<ThemeChanger setTheme={props.setTheme} />

export default HomePage;