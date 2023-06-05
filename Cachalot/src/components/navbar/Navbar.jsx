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
    LinkDiv,
    ProfileContainer,
    ProfileElement,
    XpBar,
    XpBarContainer,
    BarContainer,
    LevelInformationContainer
} from "./NavbarStyle.js";
import LinkElement from "./subComponents/LinkElement.jsx";
import ProfileXpProgress from "./subComponents/ProfileXpProgress.jsx";

// Main component
const Navbar = () => {
    const isOnTablet = useMediaQuery({ query: '(max-width: 1200px)' });
    const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const userData = useAuth().userData;

    // Function to check if the current path is the same as the one in the URL
    function isCurrent(pathname = ""){ return pathname === window.location.pathname.split('/')[1]; }

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
                    {userData === null ? <LinkElement to="profile" picture="profile.png" content="Profile" alt="Profile" /> : null}
                    <BeneathLinkContainer>
                        <LinkElement to="settings" picture="settings.png" content="Paramètres" alt="Paramètres" />
                        <LinkElement to="about" picture="about.png" content="A propos" alt="A propos" />
                    </BeneathLinkContainer>
                </LinkContainer>
                <ProfileXpProgress />
                <div className="flex gap-5 absolute bottom-0 right-0 text-black">
                    <span>isUserLoggedIn: {userData !== null ? userData.username : "Invité"}</span>
                    <span>{isOnTablet ? "Build_v0.1_Mobile" : "Build_v0.1_Desktop"}</span>
                </div>
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
                    <LinkElement to="profile" picture="profile.png" content="" alt="Profile" />
                </LinkContainer>
                <div className="flex gap-5 absolute bottom-0 right-0 text-black">
                    <span>isUserLoggedIn: {userData !== null ? userData.username : "Invité"}</span>
                    <span>{isOnTablet ? "Build_v0.1_Mobile" : "Build_v0.1_Desktop"}</span>
                </div>
            </NavbarContainer>
        )
    }
}

export default Navbar;