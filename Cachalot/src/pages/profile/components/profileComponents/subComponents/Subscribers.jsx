import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import tw from "twin.macro";

// Context
import { useCache } from "../../../../../context/manager/cache/CacheManager.js";

// Styled components
import {
    ChoosePanelContainer,
    FollowingButton,
    FollowerButton,
    FriendsDiv, NoFollowerContainer
} from "../../../styles/SubscribersStyle.js";


const Subscribers = ({isSearch, data}) => {
    // Context
    const cacheManager = useCache();
    // State
    const [followingSection, setFollowingSection] = useState(true);

    //console.log("Subscribers data: ", data);
    const userFriends = isSearch ? data.searchedUser.userFriends : cacheManager.getFriendsCache();

    //console.log("userFriends: ", userFriends)

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
                        <div tw="overflow-y-auto">
                            {
                                userFriends.following.length !== 0 ?
                                    userFriends.following.map((item, index) => {
                                        return (
                                            <FriendsDiv key={index}>
                                                <Link to={"/profile/" + item.username}>
                                                    <img src={item.photo} alt="profile picture"/>
                                                    <span>{item.displayName}</span>
                                                </Link>
                                            </FriendsDiv>
                                        )
                                    })
                                :
                                    <FriendsDiv>
                                        <NoFollowerContainer>
                                            <span>Pas d'abonnement pour le moment !</span>
                                        </NoFollowerContainer>
                                    </FriendsDiv>
                            }
                        </div>

                        :

                        <div tw="overflow-y-auto">
                            {
                                userFriends.follower.length !== 0 ?
                                    userFriends.follower.map((item, index) => {
                                        return (
                                            <FriendsDiv key={index}>
                                                <Link to={"/profile/" + item.username}>
                                                    <img src={item.photo} alt="profile picture"/>
                                                    <span>{item.displayName}</span>
                                                </Link>
                                            </FriendsDiv>
                                        )
                                    })
                                    :
                                    <FriendsDiv>
                                        <NoFollowerContainer>
                                            <span>Pas d'abonnés pour le moment !</span>
                                        </NoFollowerContainer>
                                    </FriendsDiv>
                            }
                        </div>

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