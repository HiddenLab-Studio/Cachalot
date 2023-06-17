import React from "react";
import { Link } from "react-router-dom";

import {
    ProfileContainer,
    ProfileElement,
} from "../NavbarStyle.js";
import XpBar from "./XpBar.jsx";

const ProfileXpProgress = (props) => {
    const auth = props.auth;
    const cache = props.cache;
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
                    <XpBar auth={auth} cache={cache} />
                </ProfileElement>
            </ProfileContainer>
        )
    } else {
        return null;
    }
}

export default ProfileXpProgress;