import React, { useState } from 'react';
import { styled } from "twin.macro";

// Context
import { useAuth } from "../../context/AuthContext.js";
import { useCache } from "../../context/manager/cache/CacheProvider.js";

// Components*
import Navbar from "../../components/navbar/Navbar.jsx";
import ConnectionHomePage from "../connection/ConnectionHomePage.jsx";
import FullLoading from "../../components/utils/loading/FullLoading.jsx";

import ClassGameContainer from "./components/subComponents/ClassGame.jsx";


// Styled Components
import { MainContainer, Container } from "../../components/utils/ui/GlobalStyle.js";

export const ClassContainer = styled(Container)``
const Content = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  overflow-y: hidden;
`;


const ClassGameHomePage = () => {
    // Context
    const auth = useAuth();
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = useState(!cache.isUserCached);

    if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage />
    } else {
        if (isLoading) {
            return <FullLoading setIsLoading={setIsLoading} />
        } else {
            return (
                <MainContainer>
                    <Navbar />
                    <ClassContainer>
                        <Content>
                            <ClassGameContainer auth={auth} />
                        </Content>
                    </ClassContainer>
                </MainContainer>
            )
        }
    }
}

//<ChatContainer auth={auth} />

export default ClassGameHomePage;