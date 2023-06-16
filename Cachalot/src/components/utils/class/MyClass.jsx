import React, {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import tw from "twin.macro";

// Context
import { useAuth } from "../../../context/AuthContext.js";

// Components
import Loading from "../loading/Loading.jsx";
import Navbar from "../../navbar/Navbar.jsx";

// Styled Components
import {MainContainer} from "../ui/GlobalStyle.js";
import {
    MyClassContainer,
    Content, MyClassMainTitleContainer, Title
} from "./style/MyClassStyle.js";
import ClassPanel from "./subComponents/ClassPanel.jsx";

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
                        <MyClassMainTitleContainer className="title__container">
                            <Title tw="flex flex-row items-center gap-[8px]">
                                <img src="../../../../static/img/icons/class.png" alt=""/>
                                <h1>Mes classes</h1>
                            </Title>
                            <span>
                                Ce panel vous permet de voir les classes auxquelles vous êtes inscrit.
                            </span>
                        </MyClassMainTitleContainer>
                        <ClassPanel auth={auth} />
                    </Content>
                </MyClassContainer>
            </MainContainer>
        )
    } else if(typeof auth.currentUser === "number") {
        window.location.pathname = "/profile";
    }
}

export default MyClass;