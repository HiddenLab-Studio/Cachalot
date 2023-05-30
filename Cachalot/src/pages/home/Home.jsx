import tw, { styled } from "twin.macro";

// Components
import Navbar from "../../components/navbar/Navbar.jsx"
import {AsideContainer, ContentContainer, MainContainer} from "./HomeStyle.js";
import TrendingExercise from "../../components/cards/TrendingExercise.jsx";

const Container = styled.main`
  ${tw`flex flex-row min-h-[100vh]`};
  background-color: ${props => props.theme.background};
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const Home = () => {

    return (
        <Container>
            <Navbar/>
            <MainContainer>
                <ContentContainer>
                    <TrendingExercise/>
                </ContentContainer>
                <AsideContainer>
                    <h1>aside content</h1>
                </AsideContainer>
            </MainContainer>
        </Container>
    )
}

//<ThemeChanger setTheme={props.setTheme} />

export default Home;