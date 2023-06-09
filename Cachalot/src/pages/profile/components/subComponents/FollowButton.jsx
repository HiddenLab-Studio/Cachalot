import React from "react";
import tw, { styled } from "twin.macro";
import {
    FaEdit,
    FaPlusCircle,
    FaMinusCircle
} from "react-icons/fa";

const ButtonContainer = styled.div`
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
`;


const FollowButton = ({ isSearch, data }) => {
    //let isFollowing = data.currentUserData.username.includes(data.userFriends.following);
    let isFollowing = false;

    if(!isSearch){
        return (
            <ButtonContainer>
                <button>
                    <FaEdit />
                    <span>Modifier la vitrine</span>
                </button>
            </ButtonContainer>
        )
    } else {
        if(isFollowing){
            return (
                <ButtonContainer>
                    <button>
                        <FaMinusCircle />
                        <span>Ne plus suivre</span>
                    </button>
                </ButtonContainer>
            )
        } else {
            return (
                <ButtonContainer>
                    <button>
                        <FaPlusCircle />
                        <span>Suivre</span>
                    </button>
                </ButtonContainer>
            )
        }
    }
}

export default FollowButton;