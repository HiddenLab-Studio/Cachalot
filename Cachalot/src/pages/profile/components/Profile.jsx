import React from "react";
import tw from "twin.macro";
import {useAuth} from "../../../context/AuthContext.js";

// Icons
import { FaClock } from "react-icons/fa";

// Styled components
import {
    AccountInformationContainer,
    Container, ProfileContainer,
} from "../styles/ProfilePageStyle.js";

import {
    ImgWrapper
} from "../../../components/ui/GlobalStyle.js";

const Profile = () => {
    const auth = useAuth();

    if(auth.userData === null){
        return <h1>LOADING...</h1>
    } else {
        return (
            <Container>
                <ProfileContainer>
                    <ImgWrapper width="192px">
                        <img
                            src={!auth.userData.photo ? "../../../../static/img/profilePictureTest.png" : auth.userData.photo}
                            alt="Medal"/>
                    </ImgWrapper>
                    <AccountInformationContainer>
                        <div className="title" tw="flex flex-col leading-6">
                            <h1>{auth.userData.username}</h1>
                            <span>{auth.userData.email}</span>
                        </div>
                        <div className="info">
                            <div>
                                <FaClock/>
                                <span>Membre depuis {"janvier 2023"}</span>
                            </div>
                            <div>
                                <span>Classe: {"CM1"}</span>
                            </div>
                        </div>
                    </AccountInformationContainer>
                    <button onClick={() => {
                        auth.disconnectUser()
                    }}>
                        Se déconnecter
                    </button>
                </ProfileContainer>
            </Container>
        )
    }
}

export default Profile;