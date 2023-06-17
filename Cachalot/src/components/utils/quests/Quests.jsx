import React, {useEffect} from 'react';
import { styled } from "twin.macro";

// Components
import Navbar from "../../navbar/Navbar.jsx";

// Styled Components
import {
    MainContainer,
    Container
} from "../ui/GlobalStyle.js";
import loadXpCache from "../../../utils/onLoading.js";
import xpCacheManager from "../../../context/manager/cache/xpCacheManager.js";
import {useAuth} from "../../../context/AuthContext.js";
import Loading from "../loading/Loading.jsx";
import {ClassContainer, GifWrapper} from "../class/style/ClassStyle.js";
import ClassButton from "../class/subComponents/ClassButton.jsx";

const QuestsContainer = styled(Container)``;
const Content = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
`

const Quests = () => {
    // State
    const [isLoading, setIsLoading] = React.useState(true);

    const auth = useAuth()

    useEffect(() => {
        if(auth.currentUser instanceof Object || typeof auth.currentUser === "number") {
            if(auth.currentUser instanceof Object) {
                loadXpCache(auth.currentUser, setIsLoading)
                return () => {
                    xpCacheManager.updateNodeCache(auth.currentUser.uid).then((r) => {
                        if (r) console.info("Xp cache updated!");
                    });
                }
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
                <QuestsContainer>
                    <Content>
                        <h1>Quests</h1>
                    </Content>
                </QuestsContainer>
            </MainContainer>
        )
    } else if(typeof auth.currentUser === "number") {
        window.location.pathname = "/profile";
    }

}

export default Quests;