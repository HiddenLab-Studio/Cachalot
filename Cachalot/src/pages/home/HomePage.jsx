// Components
import Navbar from "../../components/navbar/Navbar.jsx"
import TrendingExercise from "../../components/cards/TrendingExercise.jsx";

// Styled Components
import { MainContainer } from "../../components/utils/ui/GlobalStyle.js";
import {AsideContainer, ContentContainer, MainSection} from "./HomeStyle.js";

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