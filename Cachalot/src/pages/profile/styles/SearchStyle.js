import tw, { styled } from "twin.macro";
import {Container} from "../../../components/utils/ui/GlobalStyle.js";

export const InformationContainer = styled.div``
export const ElementContainer = styled.div``
export const SearchResultContainer = styled.div``
export const HeaderContainer = styled.div``
export const InputContainer = styled.div``
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  padding: 36px 25px 36px 25px;
  margin: 0 auto;
  max-width: 1024px;
  gap: 32px;
  
  h1 {
    font-size: var(--fs-sl);
    font-family: "Din_Round_Bold", sans-serif;
    color: ${props => props.theme.text};
  }
  
  ${HeaderContainer} {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding-bottom: 48px;
    border-bottom: 2px solid ${props => props.theme.borderRightColor};
    .title {
      display: flex;
      gap: 8px;
      flex-direction: column;
      span {
        font-size: var(--fs-s);
        font-family: "Din_Round", sans-serif;
        color: ${props => props.theme.subText};
        text-align: justify;
      }
    }
  }
  
  ${SearchResultContainer}  {
    .searching, .userNotFound {
      display: flex;
      justify-content: center;
      h2 {
        font-size: var(--fs-m);
        font-family: "Din_Round_Bold", sans-serif;
        color: ${props => props.theme.text};
      }
    }
    
    .map {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 2px solid ${props => props.theme.borderRightColor};
      border-radius: 12px;
      min-height: auto;
      //max-height: 512px;
      width: calc(100% - 64px);
      margin: auto; 
      
      ${ElementContainer} {
        display: flex;
        flex-direction: row;
        padding: 16px;
        border-bottom: 2px solid ${props => props.theme.borderRightColor};
        width: 100%;
        
        a {
          display: flex;
          flex-direction: row;
          flex-grow: 1;
          
          ${InformationContainer} {
            display: flex;
            flex-grow: 1;
            gap: 16px;
            align-items: center;
            img {
              width: 64px;
              height: 64px;
              border-radius: 50%;
            }
            div {
              display: flex;
              flex-direction: column;
              h2 {
                font-size: var(--fs-sm);
                font-family: "Din_Round_Bold", sans-serif;
                color: ${props => props.theme.text};
              }
              span {
                font-size: var(--fs-ss);
                font-family: "Din_Round_Bold", sans-serif;
                color: ${props => props.theme.subText};
              }
            }
          }
        }

        svg {
          align-self: center;
          color: ${props => props.theme.iconColor};
        }
      }
    }
  }
  
  ${InputContainer} {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.theme.inputBg};
    border: 2px solid ${props => props.theme.inputBorder};
    border-radius: 12px;
    height: 64px;
    padding: 16px;
    
    input {
      width: 100%;
      outline: none;
      background-color: ${props => props.theme.inputBg};
      border: none;
      font-size: var(--fs-sm);
    }
    
    svg {
      align-self: center;
      font-size: var(--fs-sm);
      margin-right: 16px;
      color: ${props => props.theme.iconColor};
    }
  }
  
`

export const SearchContainer = styled(Container)``;