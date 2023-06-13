import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useCache } from "../../../context/cache/CacheManager.js";

// Components
import Loading from "../../../components/utils/loading/Loading.jsx";
import Navbar from "../../../components/navbar/Navbar.jsx";
import ProfileInformation from "./profileComponents/ProfileInformation.jsx";
import BodyProfile from "./profileComponents/BodyProfile.jsx";

// Styled components
import {
    Content,
    ProfileContainer
} from "../styles/ProfilePageStyle.js";

import {
    MainContainer
} from "../../../components/utils/ui/GlobalStyle.js";


const Profile = (props) => {
    const navigate = useNavigate();

    // Context
    const auth = props.auth;
    const cacheManager = useCache();

    // States
    const [searchedUser, setSearchedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userNotFound, setUserNotFound] = useState(false);

    useEffect( () => {
        console.info("Rendering Profile.jsx...")

        // Functions
        const getUserFriends = async (id) => {
            // if the cache is empty, load the data from the database
            if(cacheManager.isFriendsCacheEmpty()){
                let result = await auth.getUserFriends(id);
                cacheManager.setFriendsCache(result.follower, result.following);
                return result;
            } else {
                // if the cache is not empty, load the data from the cache
                console.info("Friends loaded from cache!");
            }
        }
        const searchingUser = async (searchedUser) => {
            let result = await auth.getUserByUsername(searchedUser);
            if (result !== undefined) setSearchedUser(result);
            else setUserNotFound(true);
            return result;
        }

        // Check if the user is searching for another user
        let searchedUser = window.location.pathname.split("/")[2];
        if(searchedUser !== undefined && searchedUser.length > 0) {
            console.info("searching for user: " + searchedUser + "...");
            console.log("Friends cache: ", cacheManager.getFriendsCache());
            // if the searched user is the current user, redirect to the current user's profile
            if(auth.userData === null || auth.userData.username === searchedUser) {
                navigate("/profile")
            } else {
                searchingUser(searchedUser).then(r => {
                    console.log(r)
                    setIsLoading(false);
                } );
            }
        } else {
            // if the user is not searching for another user, load the user's friends
            getUserFriends(auth.currentUser.uid).then((result) => {
                console.info("Friends loaded successfully!");
                setIsLoading(false);
            });
        }

        return () => {
            console.info("Unmounting Profile.jsx...")
            setSearchedUser(null);
            setUserNotFound(null);
            setIsLoading(true);
        }

    }, [window.location.pathname]);

    if(isLoading) {
        return <Loading />
    } else if(userNotFound) {
        // TODO: CREATE A USER_NOT_FOUND COMPONENT
        return (
            <MainContainer>
                <Navbar />
                <ProfileContainer>
                    <Content>
                        <div>User not found!</div>
                    </Content>
                </ProfileContainer>
            </MainContainer>
        )
    } else {
        //console.info("searchedUser: " + searchedUser);
        return (
            <MainContainer>
                <Navbar />
                <ProfileContainer>
                    <Content>
                        <ProfileInformation
                            isSearch={searchedUser !== null}
                            data={searchedUser !== null ? {currentUserData: auth.userData , searchedUser: searchedUser} : {currentUserData: auth.userData, userFriends: cacheManager.getFriendsCache()}}
                        />
                        <BodyProfile
                            isSearch={searchedUser !== null}
                            data={searchedUser !== null ? {currentUserData: auth.userData , searchedUser: searchedUser} : {currentUserData: auth.userData, userFriends: cacheManager.getFriendsCache()}}
                        />
                    </Content>
                </ProfileContainer>
            </MainContainer>
        )
    }
}

export default Profile;