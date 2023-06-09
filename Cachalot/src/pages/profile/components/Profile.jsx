import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

// Components
import ProfileInformation from "./ProfileInformation.jsx";
import BodyProfile from "./BodyProfile.jsx";

// Styled components
import {
    ProfileContainer
} from "../styles/ProfilePageStyle.js";
import {Container} from "../../../components/ui/GlobalStyle.js";
import Navbar from "../../../components/navbar/Navbar.jsx";

const Profile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [searchedUserData, setSearchedUserData] = useState(null);
    const [userNotFound, setUserNotFound] = useState(false);

    const auth = useAuth();
    // useful data from auth context
    const userData = auth.userData;
    const currentUser = auth.currentUser;

    useEffect( () => {
        let searchedUser = window.location.pathname.split("/")[2];
        if(searchedUser !== undefined && searchedUser.length > 0) {
            console.log("searching for user: " + searchedUser);
            if(userData === null || userData.username === searchedUser) {
                navigate("/profile")
            } else {
                const searchingUser = async (searchedUser) => {
                    let result = await auth.getUserByUsername(searchedUser);
                    if (result !== undefined) setSearchedUserData(result);
                    else setUserNotFound(true);
                    setIsLoading(false);
                }
                searchingUser(searchedUser).then(r =>
                    console.log(searchedUser)
                );
            }
        } else {
            setIsLoading(false);
        }

        return () => {
            console.log("Unmounting")
            setSearchedUserData(null);
            setUserNotFound(null);
        }

    }, [window.location.pathname]);

    if(isLoading) {
        // TODO: CREATE A LOADING COMPONENT
        return (
            <Container>
                <Navbar />
                <div>Loading...</div>
            </Container>
        )
    } else if(userNotFound) {
        // TODO: CREATE A USER_NOT_FOUND COMPONENT
        return (
            <Container>
                <Navbar />
                <div>User not found</div>
            </Container>
        )
    } else {
        return (
            <Container>
                <Navbar />
                <ProfileContainer>
                    <ProfileInformation isSearch={searchedUserData !== null} data={searchedUserData !== null ? searchedUserData : userData} />
                    <BodyProfile />
                </ProfileContainer>
                <div tw="absolute top-0 right-0">
                    <button onClick={async () => await auth.disconnectUser()}>Logout</button>
                </div>
            </Container>
        )
    }
}



export default Profile;