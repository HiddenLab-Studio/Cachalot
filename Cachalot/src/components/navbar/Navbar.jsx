// From React
import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// Context
import { useAuth } from "../../context/AuthContext.js";

// Styled components
import {
    NavbarContainer,
    ImgWrapper,
    LinkContainer,
    BeneathLinkContainer,
} from "./NavbarStyle.js";
import LinkElement from "./subComponents/LinkElement.jsx";
import ProfileXpProgress from "./subComponents/ProfileXpProgress.jsx";

// Main component
const Navbar = () => {
    const isOnTablet = useMediaQuery({ query: '(max-width: 1200px)' });
    const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const userData = useAuth().userData;

    if(!isOnMobile){
        return (
            <NavbarContainer>
                <ImgWrapper>
                    {!isOnTablet ? <img src="../../../static/img/logoPlain.png" alt="Logo"/> : <img src="../../../static/img/logo.png" alt="Logo"/>}
                </ImgWrapper>

                <LinkContainer>
                    <LinkElement to="" picture="home.png" content="Dashboard" alt="Dashboard" />
                    <LinkElement to="exercise" picture="dumbbell.png" content="Entrainement" alt="Entrainement" />
                    <LinkElement to="ranked" picture="sword.png" content="Ligue" alt="Ligue" />
                    <LinkElement to="quest" picture="chest.png" content="Quêtes" alt="Quêtes" />
                    {userData === null ?
                        <LinkElement to="profile" picture="profile.png" content="Profile" alt="Profile" />
                        :
                        <LinkElement to="profile" picture={undefined} profilePicture={userData.photo} content="Profile" alt="Profile" />
                    }
                    <BeneathLinkContainer>
                        {
                            userData === null
                                ?
                                    null
                                :
                                    <LinkElement to="settings" picture="settings.png" content="Paramètres" alt="Paramètres" />
                        }
                        <LinkElement to="about" picture="about.png" content="A propos" alt="A propos" />
                    </BeneathLinkContainer>
                </LinkContainer>
                <ProfileXpProgress />
            </NavbarContainer>
        )
    } else {
        return (
            <NavbarContainer>
                <LinkContainer>
                    <LinkElement to="" picture="home.png" content="" alt="Dashboard" />
                    <LinkElement to="exercise" picture="dumbbell.png" content="" alt="Entrainement" />
                    <LinkElement to="ranked" picture="sword.png" content="" alt="Ligue" />
                    <LinkElement to="quest" picture="chest.png" content="" alt="Quêtes" />
                    {userData === null ?
                        <LinkElement to="profile" picture="profile.png" content="Profile" alt="Profile" />
                        :
                        <LinkElement to="profile" picture={undefined} profilePicture={userData.photo} content="Profile" alt="Profile" />
                    }
                </LinkContainer>
            </NavbarContainer>
        )
    }
}

export default Navbar;