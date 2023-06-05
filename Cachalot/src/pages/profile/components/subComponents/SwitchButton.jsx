import React from "react";
import { useMediaQuery } from "react-responsive";
import { styled } from "twin.macro";

// Styles
import {
    SwitchButtonWrapper
} from "../../styles/SignInUpPageStyle.js";


const Wrapper = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  font-weight: 700;
  
  span {
    font-size: var(--fs-ss);
    text-transform: uppercase;
    color: ${props => props.theme.cachalotColor};
    font-family: "Din_Round_Med", sans-serif;
    border-bottom: 1px dashed ${props => props.theme.cachalotColor};
    &:hover {
      cursor: pointer;
    }
  }
`

const SwitchButton = ({ state, setState, children }) => {
    const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });

    if(!isOnMobile){
        return (
            <SwitchButtonWrapper>
                <button onClick={() => setState(!state)}>
                    {children}
                </button>
            </SwitchButtonWrapper>
        )
    } else {
        return (
            <Wrapper>
                Tu n'as pas encore de compte ?
                <span onClick={() => setState(!state)}>{children}</span>
            </Wrapper>
        )
    }

}

export default SwitchButton;