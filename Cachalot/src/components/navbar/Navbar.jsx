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

// Main component
const Navbar = () => {
    const isOnTablet = useMediaQuery({ query: '(max-width: 1200px)' });
    const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const auth = useAuth();

    function handleClick(){
        auth.setIsAuthenticated(!auth.isAuthenticated);
        console.log("Current user: " + auth.currentUser);
        console.log("Object auth user: " + auth.object.username);
    }

    // Function to check if the current path is the same as the one in the URL
    function isCurrent(pathname){ return pathname === window.location.pathname; }

    return (
        <React.Fragment>
            {!isOnMobile ?
                <NavbarContainer>
                    <ImgWrapper>
                        {!isOnTablet ? <img src="../../../static/img/logoPlain.png" alt="Logo"/> : <img src="../../../static/img/logo.png" alt="Logo"/>}
                    </ImgWrapper>

                    <LinkContainer>
                        <Link to="/" onClick={() => console.log("redirected to home")}>
                            <LinkDiv current={isCurrent("/") ? "true" : "false"}>
                                <img src="../../../static/img/icons/home.png" alt="Home"/>
                                {isOnTablet ? "" : <span>Dashboard</span>}
                            </LinkDiv>
                        </Link>
                        <Link to="/exercise" onClick={() => console.log("redirected to exercise")}>
                            <LinkDiv current={isCurrent("/exercise") ? "true" : "false"}>
                                <img src="../../../static/img/icons/dumbbell.png" alt="Dumbbell"/>
                                {isOnTablet ? "" : <span>Entrainement</span>}
                            </LinkDiv>
                        </Link>
                        <Link to="/ranked" onClick={() => console.log("redirected to ranked")}>
                            <LinkDiv current={isCurrent("/ranked") ? "true" : "false"}>
                                <img src="../../../static/img/icons/sword.png" alt="Ranked"/>
                                {isOnTablet ? "" : <span>Ligue</span>}
                            </LinkDiv>
                        </Link>
                        <Link to="/quest" onClick={() => console.log("redirected to quest")}>
                            <LinkDiv current={isCurrent("/quest") ? "true" : "false"}>
                                <img src="../../../static/img/icons/chest.png" alt="Quest"/>
                                {isOnTablet ? "" : <span>Quêtes</span>}
                            </LinkDiv>
                        </Link>
                        {(auth.currentUser === null || isOnTablet) ?
                            <Link to="/profile" onClick={() => console.log("redirected to quest")}>
                                <LinkDiv current={isCurrent("/profile") ? "true" : "false"}>
                                    <img src="../../../static/img/icons/profile.png" alt="ProfilePicture"/>
                                    {isOnTablet ? "" : <span>Profile</span>}
                                </LinkDiv>
                            </Link>
                            : ""}
                        <BeneathLinkContainer>
                            <Link to="/settings" onClick={() => console.log("redirected to settings")}>
                                <LinkDiv current={isCurrent("/settings") ? "true" : "false"}>
                                    <img src="../../../static/img/icons/settings.png" alt="ProfilePicture"/>
                                    {isOnTablet ? "" : <span>Paramètres</span>}
                                </LinkDiv>
                            </Link>
                            <Link to="/about" onClick={() => console.log("redirected to about")}>
                                <LinkDiv current={isCurrent("/about") ? "true" : "false"}>
                                    <img src="../../../static/img/icons/about.png" alt="About"/>
                                    {isOnTablet ? "" : <span>A propos</span>}
                                </LinkDiv>
                            </Link>
                        </BeneathLinkContainer>
                    </LinkContainer>

                    <ProfileContainer>
                        <Link to="/profile" onClick={() => console.log("redirected to quest")}>
                            <ProfileElement>
                                <img src={auth.currentUser != null ? "../../../static/img/" + auth.object.profilePicture : "../../../static/img/icons/profile.png"} alt="ProfilePicture"/>
                            </ProfileElement>
                        </Link>
                        <ProfileElement>
                            <span>{auth.currentUser != null ? auth.currentUser : "Invité"}</span>
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
                    <div className="flex gap-5 absolute bottom-0 right-0 text-black">
                        <button onClick={() => handleClick()}>isUserLoggedIn: {auth.currentUser}</button>
                        <span>{isOnTablet ? "Build_v0.1_Mobile" : "Build_v0.1_Desktop"}</span>
                    </div>
                </NavbarContainer>
                :
                <NavbarContainer>
                    <LinkContainer>
                        <Link to="/" onClick={() => console.log("redirected to home")}>
                            <LinkDiv current={isCurrent("/") ? "true" : "false"}>
                                <img src="../../../static/img/icons/home.png" alt="Home"/>
                            </LinkDiv>
                        </Link>
                        <Link to="/exercise" onClick={() => console.log("redirected to exercise")}>
                            <LinkDiv current={isCurrent("/exercise") ? "true" : "false"}>
                                <img src="../../../static/img/icons/dumbbell.png" alt="Dumbbell"/>
                            </LinkDiv>
                        </Link>
                        <Link to="/ranked" onClick={() => console.log("redirected to ranked")}>
                            <LinkDiv current={isCurrent("/ranked") ? "true" : "false"}>
                                <img src="../../../static/img/icons/sword.png" alt="Ranked"/>
                            </LinkDiv>
                        </Link>
                        <Link to="/quest" onClick={() => console.log("redirected to quest")}>
                            <LinkDiv current={isCurrent("/quest") ? "true" : "false"}>
                                <img src="../../../static/img/icons/chest.png" alt="Quest"/>
                            </LinkDiv>
                        </Link>
                        <Link to="/profile" onClick={() => console.log("redirected to quest")}>
                            <LinkDiv current={isCurrent("/profile") ? "true" : "false"}>
                                <img src="../../../static/img/icons/profile.png" alt="ProfilePicture"/>
                            </LinkDiv>
                        </Link>
                    </LinkContainer>
                    <div className="flex gap-5 absolute bottom-0 right-0 text-black">
                        <button onClick={() => handleClick()}>isUserLoggedIn: {auth.currentUser}</button>
                        <span>{isOnTablet ? "Build_v0.1_Mobile" : "Build_v0.1_Desktop"}</span>
                    </div>
                </NavbarContainer>
            }
        </React.Fragment>
    )
}

export default Navbar;