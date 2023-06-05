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

    function getPicture(){
        if(userData.photo !== undefined) return userData.photo;
        else return "../../../../static/img/icons/profile.png";
    }

    if(userData !== null){
        return (
            <ProfileContainer>
                <Link to="/profile">
                    <ProfileElement>
                        <img src={getPicture()} alt="ProfilePicture"/>
                    </ProfileElement>
                </Link>
                <ProfileElement>
                    <span>Invité</span>
                    <XpBarContainer>
                        <BarContainer className="flex flex-row">
                            <XpBar><div></div></XpBar>
                            <span>Lv. 0</span>
                        </BarContainer>
                        <LevelInformationContainer>
                            <span>100/1000</span>
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