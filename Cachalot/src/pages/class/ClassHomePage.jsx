import React, {useEffect, useState} from 'react';
import { styled } from "twin.macro";

// Context
import { useAuth } from "../../context/AuthContext.js";
import { useCache } from "../../context/manager/cache/CacheProvider.js";

// Components*
import Navbar from "../../components/navbar/Navbar.jsx";
import ConnectionHomePage from "../connection/ConnectionHomePage.jsx";
import FullLoading from "../../components/utils/loading/FullLoading.jsx";

import AsideClass from './components/AsideClassCompnents.jsx';
import BodyClass from './components/BodyClassComponents.jsx';


// Styled Components
import { MainContainer, Container } from "../../components/utils/ui/GlobalStyle.js";
import SmallLoading from "../../components/utils/loading/SmallLoading.jsx";
import Loading from "../../components/utils/loading/Loading.jsx";

export const ClassContainer = styled(Container)``;
export const Content = styled.section`
  display: flex;
  flex-direction: row;
  max-width: 1024px;
  margin: 0 auto;
  padding: 25px;
  gap: 32px;
  min-height: 100vh;
  
  .user__not__in__class {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    h1 {
      font-family: "Din_Round_Med", sans-serif;
      color: ${props => props.theme.text};
      font-size: var(--fs-sm);
    }
  }
  
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
    const [isLoading, setIsLoading] = useState(true);
    const [isInClass, setIsInClass] = useState(false);

    useEffect(() => {
        if(auth.currentUser instanceof Object) {
            let classCode = window.location.pathname.split("/")[2];
            setIsLoading(true);
            auth.user.getUserClasses(auth.currentUser).then(r => {
                r.forEach(c => {
                    if(c.code === classCode) {
                        setIsInClass(true);
                    }
                });
                setIsLoading(false);
            });
        }
    }, [auth.currentUser]);

    if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage />
    } else {
        if (isLoading) {
            return <FullLoading setIsLoading={undefined} />
        } else {
            if(!isLoading) {
                if(isInClass) {
                    return (
                        <MainContainer>
                            <Navbar />
                            <ClassContainer>
                                <Content>
                                    <BodyClass auth={auth} />
                                    <AsideClass auth={auth}/>
                                </Content>
                            </ClassContainer>
                        </MainContainer>
                    )
                } else {
                    return (
                        <MainContainer>
                            <Navbar />
                            <ClassContainer>
                                <Content>
                                    <div className="user__not__in__class">
                                        <h1>Vous n'êtes pas dans cette classe</h1>
                                    </div>
                                </Content>
                            </ClassContainer>
                        </MainContainer>
                    )
                }
            } else {
                return <Loading />;
            }
        }
    }
}

//<ChatContainer auth={auth} />

export default ClassHomePage;