import { styled } from "twin.macro";

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

export const ExerciseStatsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  justify-content: end;
  margin-top: 10px;
`
export const ExerciseDivInfo = styled.div``
export const ExerciseDivRank = styled.div``
export const ExerciseDiv = styled.div`
  display: flex;
  flex-direction: row;
  //width: 256px;
  background-color: ${props => props.bgColor};
  border-radius: 5px;
  padding: 5px;
  gap: 5px;
  
  &:hover {
    background-color: ${props => props.theme.buttonBorderOnCurrent};
  }
  
  h1 {
    padding: 0;
    margin: 0;
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-ss);
    letter-spacing: 0.05rem;
    color: ${props => props.theme.text};
  }
  
  ${ExerciseDivRank} {
    display: flex;
    align-items: center;
    img {
      width: 64px;
    }
  }

  ${ExerciseDivInfo} {
    margin-right: 8px;
    span {
      font-family: "Din_Round", sans-serif;
      font-size: var(--fs-s);
      color: ${props => props.theme.text};
    }
  }
  
`

export const ExerciseContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 10px;
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