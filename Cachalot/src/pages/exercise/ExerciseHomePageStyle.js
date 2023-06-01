import tw, { styled } from "twin.macro";

export const Container = styled.main`
  ${tw`flex flex-row min-h-[100vh]`};
  background-color: ${props => props.theme.background};
  
  @media (max-width: 768px) {
    flex-direction: column;
  }


  
`;

export const ExerciseContainer = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 25px;
  
  .selectExerciseType {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    button {
      color: white;
      padding: 5px 10px;
      border: 1px solid white;
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
      color: white;
      padding: 5px 10px;
      border: 1px solid white;
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
    input {
      outline: none;
    }
    button {
      color: white;
      padding: 5px 10px;
      border: 1px solid white;
      border-radius: 5px;
      &:hover {
        opacity: .5;
      }
    }
  }
`