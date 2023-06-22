import React, { useState } from "react";

// Context
import { useAuth } from "../../../context/AuthContext.js";
import { useCache  } from "../../../context/manager/cache/CacheProvider.js";

// Components
import Navbar from "../../navbar/Navbar.jsx";
import FullLoading from "../loading/FullLoading.jsx";
import ConnectionHomePage from "../../../pages/connection/ConnectionHomePage.jsx";
import ClassPanel from "./subComponents/ClassPanel.jsx";

// Styled Components
import {MainContainer} from "../ui/GlobalStyle.js";
import {
    MyClassContainer,
    Content, MyClassMainTitleContainer, Title
} from "./style/MyClassStyle.js";
import DescSpan from "../ui/DescSpan.jsx"


const MyClass = () => {
    // Context
    const auth = useAuth();
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = useState(!cache.isUserCached);

    if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage />
    } else {
        if(isLoading) {
            return <FullLoading setIsLoading={setIsLoading} />
        } else {
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
                                <DescSpan
                                    desc="Ce panel vous permet de voir les classes auxquelles vous êtes inscrit."
                                />
                            </MyClassMainTitleContainer>
                            <ClassPanel auth={auth} />
                        </Content>
                    </MyClassContainer>
                </MainContainer>
            )
        }
    }
}

export default MyClass;