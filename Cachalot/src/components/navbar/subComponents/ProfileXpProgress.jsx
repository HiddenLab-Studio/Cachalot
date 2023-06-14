import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.js";
import tw from "twin.macro";

import {
    BarContainer,
    LevelInformationContainer,
    ProfileContainer,
    ProfileElement,
    XpBar,
    XpBarContainer
} from "../NavbarStyle.js";

// Icons
import { FaSignOutAlt } from "react-icons/fa";

const ProfileXpProgress = () => {
    const auth = useAuth();
    const userData = auth.userData;

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
                    <span>{userData.displayName}</span>
                    <XpBarContainer>
                        <BarContainer className="flex flex-row">
                            <XpBar><div></div></XpBar>
                            <span>Lv. {userXp.currentLvl}</span>
                        </BarContainer>
                        <LevelInformationContainer>
                            <span>{userXp.currentXp} / 1000</span>
                            <div tw="grow-[1] flex justify-end items-center">
                                <FaSignOutAlt onClick={async () => {
                                    let result = await auth.user.logout();
                                    if(result) {
                                        auth.setUserData(null);
                                        console.log(userData);
                                        console.info("Sign-out successful.")
                                    } else {
                                        console.error("Sign-out failed.")
                                    }
                                }} />
                            </div>
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