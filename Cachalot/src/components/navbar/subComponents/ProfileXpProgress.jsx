import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.js";
import tw from "twin.macro";

import {
    ProfileContainer,
    ProfileElement,
} from "../NavbarStyle.js";
import XpBar from "./XpBar.jsx";


const ProfileXpProgress = () => {
    const auth = useAuth();
    const userData = auth.userData;


    if(userData !== null){
        return (
            <ProfileContainer>
                <Link to="/profile">
                    <ProfileElement>
                        <img src={userData.photo} alt="ProfilePicture"/>
                    </ProfileElement>
                </Link>
                <ProfileElement>
                    <span className="display__name">{userData.displayName}</span>
                    <XpBar />
                </ProfileElement>
            </ProfileContainer>
        )
    } else {
        return null;
    }
}

export default ProfileXpProgress;