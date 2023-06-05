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

const ExerciseContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  color: black;
`

const ExerciseOld = () => {
    const data = {
        id: window.location.pathname.split('/')[2],
    }

    return (
        <Container>
            <Navbar />
            <ExerciseContainer>
                <h1>Exercice #{data.id} </h1>
            </ExerciseContainer>
        </Container>
    )
}

//<ThemeChanger setTheme={props.setTheme} />

export default ExerciseOld;