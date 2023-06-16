import React from "react";
import tw from "twin.macro";
import {Link} from "react-router-dom";

// Components
import ButtonCard from "../../../components/cards/ButtonCard.jsx";

// Styled Components
import {
    AsideTrainingContainer,
    QuestContainer,
    QuestListContainer, QuestProgressBarContainer,
    TitleContainer
} from "../styles/AsideTrainingStyle.js";

// Icons
import {FaChevronRight} from "react-icons/fa";

const quest = [
    {
        id: 1,
        name: "Terminer un entrainement",
        todo: 1,
        done: 0,
        reward: 10,
    },
    {
        id: 2,
        name: "Terminer 3 exercices",
        todo: 3,
        done: 1,
        reward: 30,
    },
    {
        id: 3,
        name: "Terminer 10 exercices avec une note supérieure à 15",
        todo: 10,
        done: 10,
        reward: 30,
    }
]

const AsideTraining = ({auth}) => {

    function getWidthXp(done, num) { return Math.round(done * 100 / num).toString() + "%"; }

    return (
        <AsideTrainingContainer>
            <QuestContainer>
                <TitleContainer tw="flex flex-row items-center">
                    <h1>Quêtes du jour</h1>
                    <div tw="flex justify-end grow-[1]">
                        <Link to="/quest">
                            <span>Afficher tout</span>
                        </Link>
                    </div>
                </TitleContainer>
                <QuestListContainer>
                    {
                        quest.map((q, index) => (
                            <div key={q.id} className="quest__container">
                                <div className="container">
                                    <div className="imgWrapper">
                                        <img src="../../../../static/img/icons/spark.svg" alt=""/>
                                    </div>
                                    <div className="title__and__progress">
                                        <div className="title" tw="flex flex-row items-center">
                                            <h2>{q.name}</h2>
                                            <div className="reward__container">
                                                <span>+{q.reward}XP</span>
                                            </div>
                                        </div>
                                        <QuestProgressBarContainer progress={getWidthXp(q.done, q.todo)}>
                                            <div className="progress__bar">
                                                <div className="progress__bar__fill" />
                                                <div className="info">
                                                    <span>
                                                        {q.done}/{q.todo}
                                                    </span>
                                                </div>

                                            </div>
                                            <img src="../../../../static/img/icons/chestQuest.svg" alt=""/>
                                        </QuestProgressBarContainer>
                                    </div>
                                </div>
                                {
                                    index !== quest.length - 1 ?
                                        <div className="quest__separator"/>
                                        :
                                        null
                                }
                            </div>
                        ))
                    }
                </QuestListContainer>
            </QuestContainer>
            <div tw="flex flex-col gap-[16px]">
                <ButtonCard
                    title= "Ligue"
                    desc= "Affronte la communauté et gagne des récompenses !"
                    imageURL= "../../../../../static/img/icons/sword.png"
                    link= "/ranked"
                    alt= "League"
                />
                <ButtonCard
                    title="Voir les exercices"
                    desc="Découvre les exercices réalisés par la communauté"
                    imageURL="../../../../static/img/icons/books.png"
                    alt="Exercise catalog"
                    link="/exercise/catalog"/>
                <ButtonCard
                    title="Créer un exercice"
                    desc="Créer ton propre exercice et partage le avec la communauté"
                    imageURL="../../../../static/img/icons/exercise.png"
                    alt="Create an exercise"
                    link="/exercise/create" />
            </div>
        </AsideTrainingContainer>
    )
}


/*

                                    <div tw="flex flex-row items-center gap-[12px]">
                                        <img src="../../../../static/img/icons/spark.svg" alt=""/>
                                        <div tw="flex flex-row grow-[1]">
                                            <h2>{q.name}</h2>
                                            <div className="reward__container">
                                                <span>+{q.reward}XP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <QuestProgressBarContainer progress={getWidthXp(q.done, q.todo)}>
                                            <div className="progress__bar">
                                                <div className="progress__bar__fill" />
                                            </div>
                                            <img src="../../../../static/img/icons/chestQuest.svg" alt=""/>
                                        </QuestProgressBarContainer>
                                    </div>


 */

export default AsideTraining;