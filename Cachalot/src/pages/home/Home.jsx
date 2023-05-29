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
            <section className="grow bg-gray-800 -bg-[#fdfdfd]">
                <h1>main content</h1>
            </section>
        </Container>
    )
}

//<ThemeChanger setTheme={props.setTheme} />

export default Home;