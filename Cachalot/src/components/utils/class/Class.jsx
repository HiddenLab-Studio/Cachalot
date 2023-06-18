import React, {useState} from 'react';
import tw, { styled } from "twin.macro";
import { useMediaQuery } from "react-responsive";

// Context
import {useAuth} from "../../../context/AuthContext.js";
import {useCache} from "../../../context/manager/cache/CacheProvider.js";


// Components
import Navbar from "../../navbar/Navbar.jsx";
import ClassButton from "./subComponents/ClassButton.jsx";
import FullLoading from "../loading/FullLoading.jsx";
import ConnectionHomePage from "../../../pages/connection/ConnectionHomePage.jsx";

// Styled Components
import { MainContainer } from "../ui/GlobalStyle.js";
import {ClassContainer, Content, GifWrapper} from "./style/ClassStyle.js";

const Class = () => {
    // Context
    const auth = useAuth()
    const cache = useCache();

    // Media Queries
    const isOnMobile = useMediaQuery({query: "(max-width: 768px)"});

    // State
    const [isLoading, setIsLoading] = useState(true);


    if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage />
    } else {
        if(isLoading) {
            return <FullLoading setIsLoading={setIsLoading} />
        } else {
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
        }
    }

}

export default Class;