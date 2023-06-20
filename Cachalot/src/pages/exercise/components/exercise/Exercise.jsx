import React, {useEffect, useState} from "react";
import { styled } from "twin.macro";

// Context
import { useAuth } from "../../../../context/AuthContext.js";
import { useCache } from "../../../../context/manager/cache/CacheProvider.js";

// Components
import ConnectionHomePage from "../../../connection/ConnectionHomePage.jsx";
import FullLoading from "../../../../components/utils/loading/FullLoading.jsx";
import CreateExercise from "./subComponents/create/CreateExercise.jsx";
import Navbar from "../../../../components/navbar/Navbar.jsx";

// Styled Components
import {Container, MainContainer} from "../../../../components/utils/ui/GlobalStyle.js";
import ExerciseDefault from "./subComponents/default/ExerciseDefault.jsx";

const ExerciseContainer = styled(Container)``;
const Content = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 0 auto;
  padding: 25px;
  gap: 24px;
`

const Exercise = () => {
    // Context
    const auth = useAuth();
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = useState(!cache.isUserCached);
    const [path, setPath] = useState(null);

    useEffect( () => {
        let path = window.location.pathname.split("/")[2];
        setPath(path);
        console.log(path);
    }, []);

    if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage />
    } else {
        if(isLoading){
            return <FullLoading setIsLoading={setIsLoading} />
        } else {

            return (
                <MainContainer>
                    <Navbar />
                    <ExerciseContainer>
                        <Content>
                            {
                                path === "create" ?
                                        <CreateExercise auth={auth} />
                                    :
                                        path === "catalog" ?
                                                <div>Catalog</div>
                                            :
                                                <ExerciseDefault auth={auth} id={path} />

                            }
                        </Content>
                    </ExerciseContainer>
                </MainContainer>
            )
            /*switch (path) {
                case "create":
                    return <CreateExercise auth={auth} />
                case "catalog":
                    return (
                        <div>
                            <h1>catalog</h1>
                        </div>
                    )
                default:
                    return (
                        <div>
                            <h1>default</h1>
                        </div>
                    )
            }*/
        }
    }
}

export default Exercise;