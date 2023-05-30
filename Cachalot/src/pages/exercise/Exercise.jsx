import tw, { styled } from "twin.macro";

// Components
import Navbar from "../../components/navbar/Navbar.jsx"

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
            <Navbar />
            <div>
                <h1>Exercices</h1>
            </div>
        </Container>
    )
}

//<ThemeChanger setTheme={props.setTheme} />

export default Home;