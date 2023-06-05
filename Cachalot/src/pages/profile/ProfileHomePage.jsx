import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../../context/AuthContext.js";

// Styles
import {
    Container
} from "./ProfileHomePageStyle.js";

// Components
import Navbar from "../../components/navbar/Navbar.jsx";
import SignInUp from "../connection/components/SignInUp.jsx";
import Profile from "./components/Profile.jsx";
import ConnectionHomePage from "../connection/ConnectionHomePage.jsx";


const ProfileHomePage = () => {
    const userData = useAuth().userData;

    if(userData === null){
        return <ConnectionHomePage />
    } else {
        return (
            <Container>
                <Navbar />
                <Profile />
            </Container>
        )
    }
}

export default ProfileHomePage;