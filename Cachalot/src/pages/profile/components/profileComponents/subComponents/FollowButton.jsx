import React, {useEffect, useState} from "react";
import tw, { styled } from "twin.macro";
import {
    FaEdit,
    FaPlusCircle,
    FaMinusCircle
} from "react-icons/fa";
import {useAuth} from "../../../../../context/AuthContext.js";
import {useCache} from "../../../../../context/manager/cache/CacheProvider.js";
import {useMediaQuery} from "react-responsive";

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

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    button {
      height: 32px;
    }
  }
  
`;


const FollowButton = ({ isSearch, data }) => {
    // Context
    const auth = useAuth();
    const cacheManager = useCache();

    // State
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);

    // Responsive
    const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });

    //console.log("FollowButton data: ", data)

    useEffect(() => {
        if(isSearch){
            //console.log(data.currentUserData.username);
            //console.log(data.searchedUser.userFriends.follower);
            data.searchedUser.userFriends.follower.forEach((follower) => {
                if(follower.username === data.currentUserData.username){
                    //console.log("isFollowing");
                    setIsFollowing(true);
                }
            });
        }
    }, []);

    if (!isSearch) {
        /*
        <ButtonContainer>
                <button>
                    <FaEdit/>
                    <span>Modifier la vitrine</span>
                </button>
            </ButtonContainer>

         */
        return null;
    } else {
        if (isFollowing) {
            return (
                <ButtonContainer>
                    <button onClick={async () => {
                        let result = await auth.utils.unfollowUser(data.searchedUser.userData);
                        if (result) {
                            // On update le cache pour ne plus afficher l'utilisateur dans la liste des abonnements
                            cacheManager.friendsCache.removeFriends("following", data.searchedUser.userData.username);
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
                        let result = await auth.utils.followUser(data.searchedUser.userData);
                        if (result) {
                            // On update le cache pour afficher l'utilisateur dans la liste des abonnements
                            cacheManager.friendsCache.addFriends("following", {
                                displayName: data.searchedUser.userData.displayName,
                                username: data.searchedUser.userData.username,
                                photo: data.searchedUser.userData.photo
                            });
                            console.log(cacheManager.friendsCache.getFriendsCache());
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