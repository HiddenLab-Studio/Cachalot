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
import Profile from "./components/Profile.jsx";



const SignInUpHomePage = () => {
    // userData is an object that contains all the data of the user if he is connected
    // by default this object is provided by firebase, this is for testing purposes
    const userData = useAuth();

    return (
        <Container>
            <Navbar />
            {!userData.isAuthenticated ? <Profile /> : <SignInUp />}
        </Container>
    )
}

export default SignInUpHomePage;