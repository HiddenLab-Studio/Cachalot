import React, {useEffect, useState} from 'react';
import tw, { styled } from "twin.macro";

// Context
import {useAuth} from "../../../context/AuthContext.js";

// Components
import Navbar from "../../navbar/Navbar.jsx";
import Loading from "../loading/Loading.jsx";

// Styled Components
import {
    MainContainer,
    Container
} from "../ui/GlobalStyle.js";

const ClassContainer = styled(Container)``;
const Content = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;
  align-items: center;
  padding: 25px;
  
  .Container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 512px;

    h1 {
      font-family: "Din_Round_Bold", sans-serif;
      font-size: var(--fs-xl);
      color: ${props => props.theme.text};
    }
    
    h2 {
      font-family: "Din_Round_Med", sans-serif;
      font-size: var(--fs-m);
      color: ${props => props.theme.text};
    }
    
    input {
      flex-grow: 1;
      padding: 10px 16px;
      background-color: ${props => props.theme.inputBg};
      border: 2px solid ${props => props.theme.inputBorder};
      border-radius: 12px;
      outline: none;
    }
    
  }
  
`

const Class = () => {
    const auth = useAuth()

    // State
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(auth.currentUser instanceof Object || typeof auth.currentUser === "number") setIsLoading(false);
    }, [auth.currentUser])

    if(isLoading) {
        return <Loading />
    } else if(auth.currentUser instanceof Object) {
        return (
            <MainContainer>
                <Navbar />
                <ClassContainer>
                    <Content>
                        <div className="Container">
                            <div>
                                <h1>Les Classes</h1>
                                <p>
                                    Découvrez notre système de classe en ligne interactif où l'apprentissage rencontre la communication. Partagez vos idées, posez des questions et discutez avec vos camarades de classe, le tout dans un environnement virtuel convivial.
                                </p>
                            </div>
                            <div tw="flex flex-col gap-5 sm:flex-row">
                                <div tw="w-[100%] sm:w-[50%]">
                                    <h2>Créer une classe</h2>
                                    <input type="text" placeholder="Nom de la classe"/>
                                </div>
                                <div tw="w-[50%]">
                                    <h2>Rejoindre une classe</h2>
                                    <input type="text" placeholder="Code de la classe"/>
                                </div>
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