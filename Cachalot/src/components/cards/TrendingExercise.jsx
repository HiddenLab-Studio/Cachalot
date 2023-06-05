import { Link } from "react-router-dom";
import {
    ExerciseContainer,
    ExerciseDiv,
    ExerciseDivInfo,
    ExerciseDivRank,
    ExerciseStatsContainer,
    TrendingExerciseContainer,
    TrendingTitleContainer
} from "./styles/TrendingExerciseStyle.js";

const test = [
    {
        id: 1458,
        name: "Les bases en mathématiques",
        views: 1206,
        like: 541,
        pathName: "/exercise/1458",
    },
    {
        id: 2146,
        name: "Des mots et des couleurs",
        views: 240,
        like: 75,
        pathName: "/exercise/1206",
    },
    {
        id: 6964,
        name: "Des mots et des couleurs",
        views: 100,
        like: 21,
        pathName: "/exercise/6964",
    }
]

const TrendingExercise = () => {
    return (
        <TrendingExerciseContainer>
            <TrendingTitleContainer>
                <img src="../../../static/img/icons/flameGif.gif" alt="Flame"/>
                <div>
                    <h1>Exercices en tendance</h1>
                    <span>└ Voici une sélection des exercices du moment !</span>
                </div>
            </TrendingTitleContainer>
            <ExerciseContainer>
                <Link to={test[1].pathName}>
                    <ExerciseDiv bgColor="#fff">
                        <ExerciseDivRank className="flex items-center">
                            <img src="../../../static/img/icons/2.png" alt="No2"/>
                        </ExerciseDivRank>
                        <ExerciseDivInfo>
                            <h1>No. 2</h1>
                            <span>{test[1].name}</span>
                            <ExerciseStatsContainer>
                                <span>👁️ {test[1].views}</span>
                                <span>👍 {test[1].like}</span>
                            </ExerciseStatsContainer>
                        </ExerciseDivInfo>
                    </ExerciseDiv>
                </Link>
                <Link to={test[0].pathName}>
                    <ExerciseDiv bgColor="#fff">
                        <ExerciseDivRank className="flex items-center">
                            <img src="../../../static/img/icons/1.png" alt="No1"/>
                        </ExerciseDivRank>
                        <ExerciseDivInfo>
                            <h1>No. 1</h1>
                            <span>{test[0].name}</span>
                            <ExerciseStatsContainer>
                                <span>👁️ {test[0].views}</span>
                                <span>👍 {test[0].like}</span>
                            </ExerciseStatsContainer>
                        </ExerciseDivInfo>
                    </ExerciseDiv>
                </Link>
                <Link to={test[2].pathName}>
                    <ExerciseDiv bgColor="#fff">
                        <ExerciseDivRank className="flex items-center">
                            <img src="../../../static/img/icons/3.png" alt="No3"/>
                        </ExerciseDivRank>
                        <ExerciseDivInfo>
                            <h1>No. 3</h1>
                            <span>{test[2].name}</span>
                            <ExerciseStatsContainer>
                                <span>👁️ {test[2].views}</span>
                                <span>👍 {test[2].like}</span>
                            </ExerciseStatsContainer>
                        </ExerciseDivInfo>
                    </ExerciseDiv>
                </Link>
            </ExerciseContainer>
        </TrendingExerciseContainer>
    )
}

export default TrendingExercise;