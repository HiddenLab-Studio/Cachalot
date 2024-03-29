import React, {useEffect} from 'react';
import { styled } from "twin.macro";

// Components
import Navbar from "../../components/navbar/Navbar.jsx";

// Styled Components
import {
    Container,
    MainContainer
} from "../../components/utils/ui/GlobalStyle.js";
import DescSpan from "../../components/utils/ui/DescSpan.jsx";
import {useCache} from "../../context/manager/cache/CacheProvider.js";
import FullLoading from "../../components/utils/loading/FullLoading.jsx";
import {useAuth} from "../../context/AuthContext.js";

const AboutContainer = styled(Container)``;
const Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px;
`

const AboutHomePage = () => {
    // Context
    const cache = useCache();
    const auth = useAuth();

    // State
    const [isLoading, setIsLoading] = React.useState(!cache.isUserCached);

    if(typeof auth.currentUser === "number") {
        return (
            <MainContainer>
                <Navbar />
                <AboutContainer>
                    <Content>
                        <DescSpan
                            desc="Cachalot est une plateforme d'entrainement de mathématiques et de français. Vous pouvez y trouver des exercices de mathématiques et de français mais aussi en créer et les partager avec la communauté."
                        />
                    </Content>
                </AboutContainer>
            </MainContainer>
        )
    } else {
        if(isLoading) {
            return <FullLoading setIsLoading={setIsLoading} />
        } else {
            return (
                <MainContainer>
                    <Navbar />
                    <AboutContainer>
                        <Content>
                            <DescSpan
                                desc="Cachalot est une plateforme d'entrainement de mathématiques et de français. Vous pouvez y trouver des exercices de mathématiques et de français mais aussi en créer et les partager avec la communauté."
                            />
                        </Content>
                    </AboutContainer>
                </MainContainer>
            )
        }
    }


}

export default AboutHomePage;