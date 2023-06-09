import React, { useState } from "react";
import tw, { styled } from "twin.macro";

// Icons
import { FaEdit } from "react-icons/fa";

// Styled components
const BadgeContainer = styled.div``;
const ButtonContainer = styled.div``;
const ShowcaseContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  ${ButtonContainer} {
    display: flex;
    flex-direction: row;
    justify-content: end;
    button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      transition: all 100ms ease-in-out;
      font-size: var(--fs-ss);
      padding: 0 16px;
      color: ${props => props.theme.subText};
      background-color: white;
      border: 2px solid ${props => props.theme.borderRightColor};
      border-bottom: 4px solid ${props => props.theme.borderRightColor};
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
  }
  
  ${BadgeContainer} {
    display: flex;
    align-items: end;
    justify-content: space-evenly;
    flex-direction: row;
    gap: 10px;
    flex-grow: 1;
    img {
      width: 92px;
      height: 92px;
    }
  }
  
`

const Showcase = () => {
    // State
    const [isEditing, setIsEditing] = useState(false);

    const test = ["../../../../../static/img/logo.png", 2, 3]

    return (
        <ShowcaseContainer>
            <ButtonContainer>
                <button>
                    <FaEdit />
                    <span>Modifier la vitrine</span>
                </button>
            </ButtonContainer>
            <BadgeContainer>
                {test.map((badge, index) => {
                    return (
                        <div key={index}>
                            <img src={badge} alt="badge" />
                        </div>
                    )
                })}
            </BadgeContainer>
        </ShowcaseContainer>
    )
}

export default Showcase;