import React, {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import tw from "twin.macro";

// Context
import {useAuth} from "../../../context/AuthContext.js";

// Components
import Loading from "../loading/Loading.jsx";
import Navbar from "../../navbar/Navbar.jsx";

// Styled Components
import {MainContainer} from "../ui/GlobalStyle.js";
import {
    MyClassContainer,
    Content
} from "./style/MyClassStyle.js";

const MyClass = () => {

    const auth = useAuth()
    const isOnMobile = useMediaQuery({query: "(max-width: 768px)"});

    // State
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(auth.currentUser instanceof Object || typeof auth.currentUser === "number") setIsLoading(false);
    }, [auth.currentUser])

    if(isLoading) {
        return <Loading />
    } else if(auth.currentUser instanceof Object) {
        return (
            <MainContainer>
                <Navbar />
                <MyClassContainer>
                    <Content>
                        <div className="title__container">
                            <h1>Mes classes</h1>
                            <span>
                                Ce panel vous permet de venir gérer vos classes mais également pouvoir quitter
                                les classes dans lesquelles vous êtes.
                            </span>
                        </div>

                    </Content>
                </MyClassContainer>
            </MainContainer>
        )
    } else if(typeof auth.currentUser === "number") {
        window.location.pathname = "/profile";
    }
}

export default MyClass;