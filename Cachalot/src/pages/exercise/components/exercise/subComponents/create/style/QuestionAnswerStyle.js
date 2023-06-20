import { styled } from "twin.macro";

export const QAContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  input {
    border: 2px solid ${props => props.theme.inputBorder};
    border-radius: 12px;
    padding: 12px;
    width: 100%;
    outline: none;
  }
`;
export const QuestionAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 24px 0 24px; 
  gap: 16px;
  
  .map__container {
    display: flex;
    flex-direction: row;
    width: 70%;
    align-items: center;
    justify-content: center;
    gap: 12px;
    svg {
      font-size: var(--fs-s);
      color: ${props => props.theme.errorText};
    }
  }

  .question, .answer {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 75%;
    position: relative;

    .input {
      padding: 10px 16px;
        //background-color: ${props => props.theme.inputBg};
      border: 2px solid ${props => props.theme.inputBorder};
      border-radius: 12px;
      outline: none;
      width: 100%;
    }
  }
  
  .add__container {
    display: flex;
    justify-content: center;
    border: 2px solid ${props => props.theme.inputBorder};
    border-bottom: 4px solid ${props => props.theme.inputBorder};
    border-radius: 12px;
    width: auto;
    padding: 12px;
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.inputBg};
    }
    svg {
      color: ${props => props.theme.iconColor};
    }
  }

  label {
    z-index: 1;
    display: block;
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-ss);
    position: absolute;
    top: -11px;
    left: 17px;
    letter-spacing: 0.025rem;
    pointer-events: none;
    background-color: white;
  }
  
`;