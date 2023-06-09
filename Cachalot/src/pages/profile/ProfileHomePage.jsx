import React, { useEffect, useState } from "react";
import tw from "twin.macro";

// Context
import { useAuth } from "../../context/AuthContext.js";

// Components
import Navbar from "../../components/navbar/Navbar.jsx";
import ConnectionHomePage from "../connection/ConnectionHomePage.jsx";
import Profile from "./components/Profile.jsx";

// Styled components
import {
    Container
} from "../../components/ui/GlobalStyle.js";

import {
    ProfileContainer
} from "./styles/ProfilePageStyle.js";


const ProfileHomePage = (props) => {
    // State
    const [isLoading, setIsLoading] = useState(true);

    // Context from AuthContext useful for getting user data
    const auth = useAuth();
    console.log(auth);

    // Executed every time the component is rendered or when the state of userData changes
    useEffect(() => {
        console.log("render");
        if(auth.currentUser instanceof Object || typeof auth.currentUser === "number") setIsLoading(false);
    }, [auth.currentUser])

    if(isLoading) {
        return <div>Loading...</div>
    } else if(auth.currentUser instanceof Object || props.isSearching) {
        return (
            <Container>
                <Navbar />
                <Profile />
            </Container>
        )
    } else if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage/>
    }
}

export default ProfileHomePage;