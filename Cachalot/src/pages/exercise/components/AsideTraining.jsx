import React from "react";
import tw from "twin.macro";
import {Link} from "react-router-dom";

// Components
import ButtonCard from "../../../components/cards/ButtonCard.jsx";
import Quest from "../../../components/quest/Quest.jsx";

// Styled Components
import {
    AsideTrainingContainer,
} from "../styles/AsideTrainingStyle.js";

const AsideTraining = () => {
    return (
        <AsideTrainingContainer>
            <Quest amountOfQuestToDisplay={3} />
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

export default AsideTraining;