import { styled } from "twin.macro";
import {Container} from "../../ui/GlobalStyle.js";

export const GifWrapper = styled.div`
  img {
    height: 256px;
    width: 400px;
  }
`
export const ClassContainer = styled(Container)``;
export const Content = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;
  align-items: center;
  padding: 25px;
  
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 48px;
    width: 768px;
    transition: all 0.2s ease-in-out;
    
    .titleContainer {
      display: flex;
      flex-direction: column;
      gap: 8px;
      h1 {
        font-family: "Din_Round_Bold", sans-serif;
        font-size: var(--fs-xl);
        color: ${props => props.theme.text};
      }
      span {
        font-family: "Din_Round", sans-serif;
        font-size: var(--fs-s);
        color: ${props => props.theme.subText};
        text-align: justify;
      }

      h2 {
        font-family: "Din_Round_Med", sans-serif;
        font-size: var(--fs-m);
        color: ${props => props.theme.text};
      }
    }

    input {
      flex-grow: 1;
      padding: 10px 16px;
      background-color: ${props => props.theme.inputBg};
      border: 2px solid ${props => props.theme.inputBorder};
      border-radius: 12px;
      outline: none;
    }
    
  }


  
  @media (max-width: 1000px) {
    .container {
      gap: 16px;
      width: calc(100% - 32px);
    }
  }

  @media (max-width: 768px) {
    .container {
      width: 100%;
      transform: translateY(-48px);
    }
  }
  
`