import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

// Components
import Navbar from "../../../components/navbar/Navbar.jsx";
import ProfileInformation from "./profileComponents/ProfileInformation.jsx";
import BodyProfile from "./profileComponents/BodyProfile.jsx";

// Styled components
import {
    ProfileContainer
} from "../styles/ProfilePageStyle.js";

import {
    Container
} from "../../../components/ui/GlobalStyle.js";

import {useCache} from "../../../context/cache/CacheManager.js";


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
                cacheManager.addFollower(result.follower);
                cacheManager.addFollowing(result.following);
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
        // TODO: CREATE A LOADING COMPONENT
        return (
            <Container>
                <Navbar />
                <div>Loading...</div>
            </Container>
        )
    } else if(userNotFound) {
        // TODO: CREATE A USER_NOT_FOUND COMPONENT
        return (
            <Container>
                <Navbar />
                <div>User not found</div>
            </Container>
        )
    } else {
        console.info("searchedUser: " + searchedUser);
        return (
            <Container>
                <Navbar />
                <ProfileContainer>
                    <ProfileInformation
                        isSearch={searchedUser !== null}
                        data={searchedUser !== null ? {currentUserData: auth.userData , searchedUser: searchedUser} : {currentUserData: auth.userData, userFriends: cacheManager.getFriendsCache()}}
                    />
                    <BodyProfile
                        isSearch={searchedUser !== null}
                        data={searchedUser !== null ? {currentUserData: auth.userData , searchedUser: searchedUser} : {currentUserData: auth.userData, userFriends: cacheManager.getFriendsCache()}}
                    />
                </ProfileContainer>
                <div tw="absolute top-0 right-0">
                    <button onClick={async () => await auth.disconnectUser()}>Logout</button>
                </div>
            </Container>
        )
    }
}

export default Profile;