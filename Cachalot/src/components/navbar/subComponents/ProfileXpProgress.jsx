import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.js";

import {
    BarContainer,
    LevelInformationContainer,
    ProfileContainer,
    ProfileElement,
    XpBar,
    XpBarContainer
} from "../NavbarStyle.js";
import LinkElement from "./LinkElement.jsx";

const ProfileXpProgress = () => {
    const userData = useAuth().userData;

    if(userData !== null){
        const userXp = userData.userXp;

        return (
            <ProfileContainer>
                <Link to="/profile">
                    <ProfileElement>
                        <img src={userData.photo} alt="ProfilePicture"/>
                    </ProfileElement>
                </Link>
                <ProfileElement>
                    <span>{userData.username}</span>
                    <XpBarContainer>
                        <BarContainer className="flex flex-row">
                            <XpBar><div></div></XpBar>
                            <span>Lv. {userXp.currentLvl}</span>
                        </BarContainer>
                        <LevelInformationContainer>
                            <span>{userXp.currentXp} / 1000</span>
                        </LevelInformationContainer>
                    </XpBarContainer>
                </ProfileElement>
            </ProfileContainer>
        )
    } else {
        return null;
    }
}

export default ProfileXpProgress;