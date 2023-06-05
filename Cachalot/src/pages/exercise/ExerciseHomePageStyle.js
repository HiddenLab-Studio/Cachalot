import tw, { styled } from "twin.macro";

export const Container = styled.main`
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
`