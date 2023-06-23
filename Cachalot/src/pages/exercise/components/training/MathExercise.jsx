import React, {useEffect, useState} from "react";
import tw, {styled} from "twin.macro";

// Styles
const ExerciseContainer = styled(Container)``;
const Content = styled.section`
  display: flex;
  padding: 25px;
  max-width: 1024px;
  margin: 0 auto;
  min-height: 100vh;
  @media (max-width: 768px) {
    min-height: calc(100vh - 92px);
  }

  .selectExerciseType {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    @media (max-width: 768px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    button {
      font-family: "Din_Round_Med", sans-serif;
      color: ${props => props.theme.text};
      border: 2px solid ${props => props.theme.borderRightColor};
      border-bottom: 4px solid ${props => props.theme.borderRightColor};
      border-radius: 12px;
      padding: 12px;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: ${props => props.theme.buttonBgHover};
      }
    }
  }

  .selectClassType {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    flex-direction: column;
    position: absolute;
    gap: 10px;
    @media (max-width: 1030px) {
      position: relative;
      grid-template-columns: repeat(3, 1fr);
    }

    button {
      font-family: "Din_Round_Med", sans-serif;
      color: ${props => props.theme.text};
      border: 2px solid ${props => props.theme.borderRightColor};
      border-bottom: 4px solid ${props => props.theme.borderRightColor};
      border-radius: 12px;
      padding: 12px;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: ${props => props.theme.buttonBgHover};
      }
    }
  }

`

// Data and functions
import {data, mathFunctions} from "../../functions/MathExerciseGenerator.js";

// subComponents
import SelectorClass from "./subComponents/SelectorClass.jsx";
import SelectorType from "./subComponents/SelectorType.jsx";
import Navbar from "../../../../components/navbar/Navbar.jsx";
import {MainContainer, Container} from "../../../../components/utils/ui/GlobalStyle.js";
import {useMediaQuery} from "react-responsive";
import ConnectionHomePage from "../../../connection/ConnectionHomePage.jsx";
import FullLoading from "../../../../components/utils/loading/FullLoading.jsx";
import {useAuth} from "../../../../context/AuthContext.js";
import {useCache} from "../../../../context/manager/cache/CacheProvider.js";
import ExerciseDisplay from "../../../../components/exercise/ExerciseDisplay.jsx";

const MathExercise = () => {
    // Context
    const auth = useAuth();
    const cache = useCache();

    // States
    const [isLoading, setIsLoading] = useState(true);
    const [exercise, setExercise] = useState(data.currentExercise);

    // Media queries
    const isOnMobile = useMediaQuery({query: "(max-width: 1030px)"});

    // Functions
    function handleState(type, newData) {
        switch (type) {
            case "exercise":
                setExercise(newData);
                break;
            case "exerciseType":
                mathFunctions.selectExerciseType(newData).then(() => {
                    setExercise(data.currentExercise);
                });
                break;
            default:
                console.log("Error: handleState() type not found");
                break;
        }
    }

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
                            {
                                isOnMobile ?
                                    null
                                    :
                                    <div className="selectClassType">
                                        <SelectorClass setState={handleState}/>
                                    </div>
                            }

                            <div tw="flex flex-col items-center w-[100%]">
                                <div className="selectExerciseType">
                                    <SelectorType setState={handleState} exerciseType={data.currentExerciseType}/>
                                </div>

                                <ExerciseDisplay exercise={exercise} setExercise={setExercise} />

                                {
                                    !isOnMobile ?
                                        null
                                        :
                                        <div className="selectClassType">
                                            <SelectorClass setState={handleState}/>
                                        </div>
                                }
                            </div>
                        </Content>
                    </ExerciseContainer>
                </MainContainer>
            )
        }
    }

}

export default MathExercise;