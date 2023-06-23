import React, {useState} from "react";
import tw, {styled} from "twin.macro";

// Context
import {useAuth} from "../../../../context/AuthContext.js";
import {useCache} from "../../../../context/manager/cache/CacheProvider.js";

// Components
import ConnectionHomePage from "../../../connection/ConnectionHomePage.jsx";
import FullLoading from "../../../../components/utils/loading/FullLoading.jsx";
import Navbar from "../../../../components/navbar/Navbar.jsx";
import ExerciseFrenchDisplay from "./subComponents/french/ExerciseFrenchDisplay.jsx";

// Styled components
import {MainContainer, Container} from "../../../../components/utils/ui/GlobalStyle.js";
const ExerciseContainer = styled(Container)``;
const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 25px;
  min-height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
  @media (max-width: 768px) {
    min-height: calc(100vh - 92px);
  }
`

const FrenchExercise = () => {
    // Context
    const auth = useAuth();
    const cache = useCache();

    // States
    const [isLoading, setIsLoading] = useState(true);

    if (typeof auth.currentUser === "number") {
        return <ConnectionHomePage/>
    } else {
        if (!cache.isUserCached) {
            return <FullLoading setIsLoading={setIsLoading}/>
        } else {
            return (
                <MainContainer>
                    <Navbar/>
                    <ExerciseContainer>
                        <Content>
                            <ExerciseFrenchDisplay/>
                        </Content>
                    </ExerciseContainer>
                </MainContainer>
            )
        }
    }
}

export default FrenchExercise;