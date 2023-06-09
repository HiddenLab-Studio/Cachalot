import React, {useEffect, useState} from "react";
import tw, { styled } from "twin.macro";
import {
    FaEdit,
    FaPlusCircle,
    FaMinusCircle
} from "react-icons/fa";
import {useAuth} from "../../../../context/AuthContext.js";

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
    const auth = useAuth();
    // State
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);

    console.log("FollowButton data: ", data)

    useEffect(() => {
        if(isSearch){
            console.log(data.currentUserData.username);
            console.log(data.searchedUser.userFriends.follower);
            data.searchedUser.userFriends.follower.forEach((follower) => {
                if(follower.username === data.currentUserData.username){
                    console.log("isFollowing");
                    setIsFollowing(true);
                }
            });
        }
    }, []);

    if (!isSearch) {
        return (
            <ButtonContainer>
                <button>
                    <FaEdit/>
                    <span>Modifier la vitrine</span>
                </button>
            </ButtonContainer>
        )
    } else {
        if (isFollowing) {
            return (
                <ButtonContainer>
                    <button onClick={async () => {
                        let result = await auth.unfollowUser(data.searchedUser.userData);
                        if (result) {
                            console.log("unFollowed user successfully!");
                            setIsFollowing(false);
                        } else {
                            console.error("Failed to unfollow user!");
                        }
                    }}>
                        <FaMinusCircle/>
                        <span>Ne plus suivre</span>
                    </button>
                </ButtonContainer>
            )
        } else {
            return (
                <ButtonContainer>
                    <button onClick={async () => {
                        let result = await auth.followUser(data.searchedUser.userData);
                        if (result) {
                            console.log("Followed user successfully!");
                            setIsFollowing(true);
                        } else {
                            console.error("Failed to follow user!");
                        }
                    }}>
                        <FaPlusCircle/>
                        <span>Suivre</span>
                    </button>
                </ButtonContainer>
            )
        }
    }

}

export default FollowButton;