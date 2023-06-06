import React, {useEffect} from "react";

// Context
import { useAuth } from "../../context/AuthContext.js";

// Styled components
import {
    Container
} from "../../components/ui/GlobalStyle.js";

// Components
import Navbar from "../../components/navbar/Navbar.jsx";
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