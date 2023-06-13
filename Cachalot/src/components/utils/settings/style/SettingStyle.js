import tw, { styled } from 'twin.macro';
import {Container} from "../../ui/GlobalStyle.js";

export const ApplyChangesButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: all 100ms ease-in-out;
    font-size: var(--fs-ss);
    padding: 0 16px;
    color: ${props => props.change === true ? props.theme.cachalotColor : props.theme.subText};
    background-color: ${props => props.change === true ? "white" : props.theme.buttonBgHover};
    border: 2px solid ${props => props.theme.borderRightColor};
    border-radius: 12px;
    width: inherit;
    height: 48px;
    outline: none;
    text-transform: uppercase;
    font-family: "Din_Round_Bold", sans-serif;
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.buttonBgHover};
    }
  }
`
export const SettingsContainer = styled(Container)``;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 0 auto;
  padding: 32px 25px 25px 25px;

  h1 {
    font-size: var(--fs-l);
    font-family: "Din_Round_Bold", sans-serif;
    color: ${props => props.theme.text};
    border-bottom: 2px solid ${props => props.theme.borderRightColor};
  }
  
  .TableContainer {
    display: flex;
    justify-content: center;
    padding: 25px;
    
    tbody {
      width: 95%;
      tr {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        td {
          display: flex;
          gap: 24px;
          width: 50%;
          h2 {
            flex-grow: 1;
            font-size: var(--fs-s);
            font-family: "Din_Round_Med", sans-serif;
            font-weight: 700;
            color: ${props => props.theme.text};
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
      }
    }
  }

  
`