import React, { useState } from "react";
import tw, { styled } from "twin.macro";

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 100ms ease-in-out;
  font-size: var(--fs-ss);
  padding: 0 16px;
  color: ${props => props.theme.cachalotColor};
  border: 2px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  width: calc(50% - 32px);
  height: 48px;
  outline: none;
  text-transform: uppercase;
  font-family: "Din_Round_Bold", sans-serif;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.buttonBgHover};
  }
}`

const CancelButtonContainer = styled.div`
  width: inherit;
  svg {
    position: absolute;
    align-self: center;
    width: inherit;
    &:hover {
      cursor: pointer;
    }
  }
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: inherit;
`

const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: calc(100% - 32px);
  gap: 16px;
  @media (max-width: 768px) {
    align-items: center;
    flex-direction: column;
    ${Button} {
      width: calc(100% - 64px);
    }
  }
`

// Icons
import { MdOutlineCancel } from "react-icons/md";

const ClassButton = () => {
    // State
    const [joinClassOverlay, setJoinClassOverlay] = useState(undefined);

    if(joinClassOverlay === undefined) {
        return (
            <ChoiceContainer>
                <Button onClick={() => setJoinClassOverlay(true)}>
                    <span>Rejoindre une classe</span>
                </Button>
                <Button onClick={() => setJoinClassOverlay(false)}>
                    <span>Créer une classe</span>
                </Button>
            </ChoiceContainer>
        )
    } else {
        return (
            <InputContainer>
                <input type="text" placeholder={joinClassOverlay ? "Code de la classe" : "Nom de la classe"}/>
                <CancelButtonContainer>
                    <MdOutlineCancel onClick={() => setJoinClassOverlay(undefined)} />
                </CancelButtonContainer>
            </InputContainer>
        )
    }
}

export default ClassButton;