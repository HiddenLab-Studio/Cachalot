import React from "react";

// Context
import { useAuth } from "../../context/AuthContext.js";

// Styles
import {
    Container
} from "./ProfileHomePageStyle.js";

// Components
import Navbar from "../../components/navbar/Navbar.jsx";
import SignInUp from "./components/SignInUp.jsx";
import HomePage from "../home/HomePage.jsx";
import Profile from "./components/Profile.jsx";


const ProfileHomePage = (props) => {
    const auth = useAuth();

    // DEBUG
    console.log(auth.currentUser);
    console.log(auth.userData);

    return (
        <Container>
            <Navbar />
            {auth.currentUser !== null ? <Profile /> : <SignInUp />}
        </Container>
    )
}

export default ProfileHomePage;