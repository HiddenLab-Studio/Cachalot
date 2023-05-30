import { styled } from "twin.macro";

// Styled Components
export const TrendingTitleContainer = styled.div`
  display: flex;
  align-items: center;
  h1 {
    padding: 0;
    margin: 0;
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-m);
    letter-spacing: 0.05rem;
    color: ${props => props.theme.text};
  }
  span {
    font-family: "Din_Round", sans-serif;
    font-size: var(--fs-ss);
    letter-spacing: 0.05rem;
  }
`

export const ExerciseDiv = styled.div`
  width: 256px;
  height: 64px;
  background-color: ${props => props.bgColor};
  border-radius: 5px;
  padding: 5px;
  
  h1 {
    padding: 0;
    margin: 0;
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-ss);
    letter-spacing: 0.05rem;
    color: ${props => props.theme.text};
  }
`

export const ExerciseDivTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  img {
    width: 32px;
    height: 32px;
  }
`

export const ExerciseContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const TrendingExerciseContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
  
  background-color: ${props => props.theme.buttonBgHover};
  border-radius: 12px;
`

const test = [
    {
        id: 1,
        name: "Additions, soustractions et multiplication",
        views: 1206,
        like: 541
    },
    {
        id: 2,
        name: "Des mots et des couleurs",
        views: 240,
        like: 75
    }
]

const TrendingExercise = () => {

    return (
        <TrendingExerciseContainer>
            <TrendingTitleContainer>
                <img src="../../../static/img/icons/flameGif.gif" alt="Flame"/>
                <div>
                    <h1>Exercices en tendance</h1>
                    <span>└ Voici une sélection des exercices du moment !</span>
                </div>
            </TrendingTitleContainer>
            <ExerciseContainer>
                <ExerciseDiv bgColor="#fff">
                    <ExerciseDivTitle>
                        <img src="../../../static/img/icons/2.png" alt="No2"/>
                        <h1>{test[1].name}</h1>
                    </ExerciseDivTitle>
                </ExerciseDiv>
            </ExerciseContainer>
        </TrendingExerciseContainer>
    )
}

export default TrendingExercise;