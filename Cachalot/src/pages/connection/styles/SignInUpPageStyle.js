import tw, { styled } from 'twin.macro';
import {Container} from "../../../components/utils/ui/GlobalStyle.js";

export const GoogleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 48px;
  margin: 20px 0;
  width: calc(100% - 30px);
  
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: all 100ms ease-in-out;
    svg {
      font-size: var(--fs-sm);
      align-self: center;
    }
    
    font-size: var(--fs-ss);
    letter-spacing: 0.5px;
    padding: 0 16px;
    color: ${props => props.theme.cachalotColor};
    background-color: white;
    border: 2px solid ${props => props.theme.borderRightColor};
    border-radius: 12px;
    width: inherit;
    height: inherit;
    outline: none;
    text-transform: uppercase;
    font-family: "Din_Round_Bold", sans-serif;
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.buttonBgHover};
    }
  }
`

export const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  .line {
    background: ${props => props.theme.borderRightColor};
    flex-grow: 1;
    height: 2px;
  }
  .where {
    text-transform: uppercase;
    font-weight: 700;
    color: ${props => props.theme.whereColor};
    flex-grow: 0;
    padding: 0 8px;
  }
`
export const SignInUpButtonContainer = styled.div`
  width: ${props => props.width};
  margin: 20px 0;
  height: 48px;
  
  button {
    font-size: var(--fs-ss);
    padding: 0 16px;
    color: ${props => props.theme.buttonText};
    background-color: ${props => props.theme.buttonBg};
    border: 1px solid ${props => props.theme.buttonBorder};
    border-radius: 12px;
    width: inherit;
    height: inherit;
    outline: none;
    text-transform: uppercase;
    font-family: "Din_Round_Bold", sans-serif;
    &:hover {
      cursor: pointer;
      opacity: .9;
    }
  }
`

export const InputWithForgotPassword = styled.div``
export const InputWithRevealPassword = styled(InputWithForgotPassword)``;
export const FieldContainer = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  input {
    padding: 10px 16px;
    background-color: ${props => props.theme.inputBg};
    border: 2px solid ${props => props.theme.inputBorder};
    border-radius: 12px;
    width: 100%;
    outline: none;
  }
  
  ${InputWithForgotPassword}, ${InputWithRevealPassword} {
    display: flex;
    flex-direction: row-reverse;
    a, button {
      align-self: center;
      position: absolute;
      width: inherit;
      font-size: var(--fs-ss);
      font-weight: 700;
      margin-right: 16px; 
      letter-spacing: 0.05rem;
    }
  }
  
`

export const SwitchButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 25px 25px 0 0;
  height: 48px;
  
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: all 100ms ease-in-out;
    font-size: var(--fs-ss);
    padding: 0 16px;
    color: ${props => props.theme.cachalotColor};
    background-color: white;
    border: 2px solid ${props => props.theme.borderRightColor};
    border-radius: 12px;
    width: inherit;
    height: inherit;
    outline: none;
    text-transform: uppercase;
    font-family: "Din_Round_Bold", sans-serif;
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.buttonBgHover};
    }
  }
`

export const SignInUpContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;
export const Content = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  font-family: "Din_Round", sans-serif;
  color: ${props => props.theme.text};
  align-items: center;
  align-self: center;

  h1 {
    font-size: var(--fs-sl);
    font-weight: 700;
    margin: 10px 0 10px;
  }
  
  .error {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
    font-size: var(--fs-ss);
    color: ${props => props.theme.errorText};
    svg {
      font-size: var(--fs-sm);
    }
  }

  @media (max-width: 768px) {
    ${FieldContainer} {
      input {
        padding: 7px 15px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0;
    transform: translateY(-48px);
  }
  
`

