import React, {useEffect} from 'react';
import { styled } from "twin.macro";

// Components
import Navbar from "../../navbar/Navbar.jsx";

// Styled Components
import {
    Container,
    MainContainer
} from "../ui/GlobalStyle.js";
import loadXpCache from "../../../utils/onLoading.js";
import {useAuth} from "../../../context/AuthContext.js";
import Loading from "../loading/Loading.jsx";

const AboutContainer = styled(Container)``;
const Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px;
`

const About = () => {
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
                        <h1>About</h1>
                    </Content>
                </AboutContainer>
            </MainContainer>
        )
    }
}

export default About;