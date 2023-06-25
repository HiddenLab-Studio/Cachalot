import React, {useEffect} from 'react';
import { styled } from "twin.macro";

// Components
import Navbar from "../../components/navbar/Navbar.jsx";

// Styled Components
import {
    Container,
    MainContainer
} from "../../components/utils/ui/GlobalStyle.js";
import loadXpCache from "../../utils/onLoading.js";
import {useAuth} from "../../context/AuthContext.js";
import Loading from "../../components/utils/loading/Loading.jsx";
import DescSpan from "../../components/utils/ui/DescSpan.jsx";

const AboutContainer = styled(Container)``;
const Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px;
`

const AboutHomePage = () => {
    // State
    const [isLoading, setIsLoading] = React.useState(true);

    const auth = useAuth()

    useEffect(() => {
        if (auth.currentUser instanceof Object) {
            loadXpCache(auth.currentUser, setIsLoading)
        } else {
            setIsLoading(false)
        }
    }, [auth.currentUser])

    if(isLoading) {
        return <Loading />
    } else {
        return (
            <MainContainer>
                <Navbar />
                <AboutContainer>
                    <Content>
                        <DescSpan
                            desc="Cachalot est une plateforme d'entrainement aux mathématiques et au français. Vous pouvez y trouver des exercices de mathématiques et de français mais aussi en créer et les partager avec la communauté."
                        />
                    </Content>
                </AboutContainer>
            </MainContainer>
        )
    }
}

export default AboutHomePage;