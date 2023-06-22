import React, { useState } from 'react';
import { styled } from "twin.macro";

// Context
import { useAuth } from "../../context/AuthContext.js";
import { useCache } from "../../context/manager/cache/CacheProvider.js";

// Components*
import Navbar from "../../components/navbar/Navbar.jsx";
import ConnectionHomePage from "../connection/ConnectionHomePage.jsx";
import FullLoading from "../../components/utils/loading/FullLoading.jsx";


import ClassTitle from "./components/subComponents/ClassTitle.jsx";
import AsideClass from './components/asideClass.jsx';


// Styled Components
import { MainContainer, Container } from "../../components/utils/ui/GlobalStyle.js";


export const ClassContainer = styled(Container)``;
export const Content = styled.section`
  display: flex;
  flex-direction: row;
  max-width: 1024px;
  margin: 0 auto;
  padding: 25px;
  gap: 32px;

  @media (min-width: 768px) and (max-width: 1050px) {
    max-width: 768px;
  }
  
  @media (min-width: 0px) and (max-width: 1050px) {  
    flex-direction: column;
  }
  
`

const ClassHomePage = () => {
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
                            <ClassTitle auth={auth} />
                            <AsideClass auth={auth}/>      
                        </Content>
                    </ClassContainer>
                </MainContainer>
            )
        }
    }
}

//<ChatContainer auth={auth} />

export default ClassHomePage;