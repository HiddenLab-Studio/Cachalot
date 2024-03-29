import React from "react";
import { useMediaQuery } from "react-responsive";

// Context
import { useAuth } from "../../context/AuthContext.js";
import { useCache } from "../../context/manager/cache/CacheProvider.js";

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
    // Media queries
    const isOnTablet = useMediaQuery({ query: '(max-width: 1200px)' });
    const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });

    // Context
    const auth = useAuth();
    const cache = useCache();
    const userData = auth.userData;

    if (!isOnMobile) {
        return (
            <NavbarContainer>
                <ImgWrapper>
                    {!isOnTablet ? <img src="../../../static/img/logoPlain.png" alt="Logo"/> :
                        <img src="../../../static/img/logo.png" alt="Logo"/>}
                </ImgWrapper>

                <LinkContainer>
                    <LinkElement to="" picture="home.png" content="Dashboard" alt="Dashboard"/>
                    <LinkElement to="exercise" picture="dumbbell.png" content="Entrainement" alt="Entrainement"/>
                    <LinkElement to="ranked" picture="sword.png" content="Ligue" alt="Ligue"/>
                    <LinkElement to="quest" picture="chest.png" content="Quêtes" alt="Quêtes"/>
                    {userData === null ?
                        <LinkElement to="profile" picture="profile.png" content="Profil" alt="Profil"/>
                        :
                        <LinkElement to="profile" picture={undefined} profilePicture={userData.photo} content="Profil"
                                     alt="Profil"/>
                    }
                    <BeneathLinkContainer>
                        {
                            userData === null
                                ?
                                null
                                :
                                <LinkElement to="settings" picture="settings.png" content="Paramètres"
                                             alt="Paramètres"/>
                        }
                        <LinkElement to="about" picture="about.png" content="A propos" alt="A propos"/>
                    </BeneathLinkContainer>
                </LinkContainer>
                <ProfileXpProgress auth={auth} cache={cache}/>
            </NavbarContainer>
        )
    } else {
        return (
            <NavbarContainer>
                <LinkContainer>
                    <LinkElement to="" picture="home.png" content="" alt="Dashboard"/>
                    <LinkElement to="exercise" picture="dumbbell.png" content="" alt="Entrainement"/>
                    <LinkElement to="ranked" picture="sword.png" content="" alt="Ligue"/>
                    <LinkElement to="quest" picture="chest.png" content="" alt="Quêtes"/>
                    {userData === null ?
                        <LinkElement to="profile" picture="profile.png" content="Profil" alt="Profil"/>
                        :
                        <LinkElement to="profile" picture={undefined} profilePicture={userData.photo} content="Profil"
                                     alt="Profil"/>
                    }
                </LinkContainer>
            </NavbarContainer>
        )
    }
}

export default Navbar;