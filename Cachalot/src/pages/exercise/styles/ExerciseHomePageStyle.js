import tw, { styled } from "twin.macro";
import { Container } from "../../../components/utils/ui/GlobalStyle.js";



export const TrainingContainer = styled(Container)``;
export const Content = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1024px;
  margin: 0 auto;
  padding: 32px 25px 32px 25px;
  gap: 32px;

  @media (min-width: 0px) and (max-width: 1050px) {  
    flex-direction: column;
  }
  
`




























/*export const Container = styled.main`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const ExerciseContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 20px;
  padding: 25px;
  
  .selectExerciseType {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    button {
      color: black;
      padding: 5px 10px;
      border: 1px solid black;
      border-radius: 5px;
      background-color: ${props => props.current === "true" ? props.theme.buttonBgOnCurrent : "transparent"};
      &:hover {
        opacity: .5;
      }
    }
  }

  .selectClassType {
    display: flex;
    flex-direction: column;
    position: absolute;
    gap: 10px;
    button {
      color: black;
      padding: 5px 10px;
      border: 1px solid black;
      border-radius: 5px;
      &:hover {
        opacity: .5;
      }
    }
  }
  
  .exercise{
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 30px;
    flex-grow: 2;
    gap: 10px;
    color: black;
    input {
      outline: none;
      border: 1px solid black;
    }
    button {
      color: black;
      padding: 5px 10px;
      border: 1px solid black;
      border-radius: 5px;
      &:hover {
        opacity: .5;
      }
    }
  }
`*/