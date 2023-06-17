import React, {useEffect, useState} from 'react';
import tw, { styled } from "twin.macro";
import { useMediaQuery } from "react-responsive";

// Context
import {useAuth} from "../../../context/AuthContext.js";

// Components
import Navbar from "../../navbar/Navbar.jsx";
import Loading from "../loading/Loading.jsx";
import ClassButton from "./subComponents/ClassButton.jsx";

// Styled Components
import { MainContainer } from "../ui/GlobalStyle.js";
import {ClassContainer, Content, GifWrapper} from "./style/ClassStyle.js";
import loadXpCache from "../../../utils/onLoading.js";
import xpCacheManager from "../../../context/manager/cache/xpCacheManager.js";

const Class = () => {
    const auth = useAuth()
    const isOnMobile = useMediaQuery({query: "(max-width: 768px)"});

    // State
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(auth.currentUser instanceof Object || typeof auth.currentUser === "number") {
            if(auth.currentUser instanceof Object) {
                loadXpCache(auth.currentUser, setIsLoading)
            } else {
                setIsLoading(false)
            }
        }
    }, [auth.currentUser])

    if(isLoading) {
        return <Loading />
    } else if(auth.currentUser instanceof Object) {
        return (
            <MainContainer>
                <Navbar />
                <ClassContainer>
                    <Content>
                        <div className="container">
                            {
                                !isOnMobile ?
                                    <GifWrapper>
                                        <img src="../../../../static/img/gif/papy.gif" alt=""/>
                                    </GifWrapper>
                                    :
                                    null
                            }
                            <div tw="flex flex-col gap-5">
                                <div className="titleContainer">
                                    <h1>Les classes</h1>
                                    <span>
                                    Découvrez notre système de classe en ligne interactif où l'apprentissage rencontre
                                    la communication. Partagez vos idées, posez des questions et discutez avec vos
                                    camarades de classe, le tout dans un environnement virtuel convivial.
                                    </span>
                                </div>
                                <ClassButton auth={auth} />
                            </div>
                        </div>
                    </Content>
                </ClassContainer>
            </MainContainer>
        )
    } else if(typeof auth.currentUser === "number") {
        window.location.pathname = "/profile";
    }
}

export default Class;