import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { useCache } from "../../../../context/cache/CacheManager.js";

const FollowerButton = styled.div`
  border-bottom: 2px solid ${props => props.current === false ? props.theme.cachalotColor : props.theme.borderRightColor};
  color: ${props => props.current === false ? props.theme.cachalotColor : props.theme.subText};
`;

const FollowingButton = styled.div`
  border-bottom: 2px solid ${props => props.current === true ? props.theme.cachalotColor : props.theme.borderRightColor};
  color: ${props => props.current === true ? props.theme.cachalotColor : props.theme.subText};
`;

const ChoosePanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  height: 512px;
  
  .followingOrFollowerSection {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 48px;
    
    ${FollowingButton}, ${FollowerButton} {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: "Din_Round_Med", sans-serif;
      text-transform: uppercase;
      &:hover {
        cursor: pointer;
        color: ${props => props.theme.cachalotColor};
        border-bottom: 2px solid ${props => props.theme.cachalotColor};
      }
    }
  }
`;

const Subscribers = ({isSearch, data}) => {
    const cacheManager = useCache();

    // State
    const [followingSection, setFollowingSection] = useState(true);

    console.log("Subscribers data: ", data);
    const userFriends = isSearch ? data.searchedUser.userFriends : cacheManager.getFriendsCache();

/*    if(userData.id !== undefined) console.log(auth.currentUser.uid !== userData.id)

    useEffect(() => {
        const getFollowing = async (id) => {
            let result = await auth.getUserFollowing(id);
            setFollowingList(result.following);
            setFollowerList(result.follower);
        }

        if(userData.id !== undefined) getFollowing(userData.id);
        else getFollowing(auth.currentUser.uid)

        return () => {}

    }, []);*/

    return (
        <>
            <ChoosePanelContainer>
                <div className="followingOrFollowerSection">
                    <FollowingButton current={followingSection} onClick={() => setFollowingSection(true)}>
                        <span>Abonnements</span>
                    </FollowingButton>
                    <FollowerButton current={followingSection} onClick={() => setFollowingSection(false)}>
                        <span>Abonnés</span>
                    </FollowerButton>
                </div>
                {
                    followingSection ?
                        userFriends.following.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Link to={"/profile/" + item.username}>
                                        <img src={item.photo} alt="profile picture"/>
                                        <span>{item.username}</span>
                                    </Link>
                                </div>
                            )
                        })
                        :
                        userFriends.follower.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Link to={"/profile/" + item.username}>
                                        <img src={item.photo} alt="profile picture"/>
                                        <span>{item.username}</span>
                                    </Link>
                                </div>
                            )
                        })
                }
            </ChoosePanelContainer>
        </>
    )
}

/*

                {
                    followingSection ?
                        followingList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <img src={item.photo} alt="profile picture"/>
                                    <span>{item.username}</span>
                                </div>
                            )
                        })
                        :
                        followerList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <img src={item.photo} alt="profile picture"/>
                                    <span>{item.username}</span>
                                </div>
                            )
                        })
                }


 */

export default Subscribers;