import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext.js";

// Components
import ProfileInformation from "./ProfileInformation.jsx";

// Styled components
import {
    ProfileContainer
} from "../styles/ProfilePageStyle.js";
import BodyProfile from "./BodyProfile.jsx";


import firebaseConfigClient from "../../../services/firebase.config.js";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchedUser, setSearchedUser] = useState(null);

    const auth = useAuth();
    const userData = auth.userData;

    useEffect( () => {
        // If the user is searching for a specific user
        if (window.location.pathname.split("/")[2].length > 0) {
            setIsLoading(true);
            console.log(window.location.pathname.split("/")[2])
            setSearchedUser({
                username: window.location.pathname.split("/")[2],
            });
            setIsLoading(false);
        }
    }, []);

    if(isLoading) {
        return <div>Loading...</div>
    } else {
        return (
            <>
                <ProfileContainer>
                    <ProfileInformation userData={searchedUser !== null ? searchedUser : userData} />
                    <BodyProfile />
                </ProfileContainer>
                <div tw="absolute top-0 right-0">
                    <button onClick={() => auth.disconnectUser()}>Logout</button>
                </div>
            </>
        )
    }
}



export default Profile;