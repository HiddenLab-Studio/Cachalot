import React from "react";
import tw from "twin.macro";

// Context
import {useCache} from "../../../../context/manager/cache/FriendsCacheManager.js";

// Styled components
import {
    BodyProfileAsideContainer,
    BodyProfileContainer,
    BodyProfileSectionContainer,
    GridContainer,
    GridElement,
    SuccessContainer
} from "../../styles/ProfilePageStyle.js";

// Components
import { Link } from "react-router-dom";
import Subscribers from "./subComponents/Subscribers.jsx";

// Icons
import { FaChevronRight } from "react-icons/fa";
import ButtonCard from "../../../../components/cards/ButtonCard.jsx";


const BodyProfile = ({isSearch, data}) => {
    const cacheManager = useCache();

    //console.info("BodyProfile data:");
    //console.log(data)
    let userData = isSearch ? data.searchedUser.userData : data.currentUserData;

    return (
        <BodyProfileContainer>
            <BodyProfileSectionContainer>
                <h1>Statistiques</h1>
                <GridContainer className="gridContainer">
                    <GridElement tw="flex flex-row">
                        <img src="../../../../../static/img/icons/flameStreak.svg" alt="Flame"/>
                        <div>
                            <span>0</span>
                            <h2>Jours d'affilée</h2>
                        </div>
                    </GridElement>
                    <GridElement>
                        <img src="../../../../../static/img/icons/spark.svg" alt="Flame"/>
                        <div>
                            <span>{userData.userEx.totalTrainingDone}</span>
                            <h2>Entrainement terminés</h2>
                        </div>
                    </GridElement>
                    <GridElement>
                        <img src="../../../../../static/img/icons/spark.svg" alt="Flame"/>
                        <div>
                            <span>{userData.userXp.currentXp}</span>
                            <h2>Xp gagnés</h2>
                        </div>
                    </GridElement>
                    <GridElement>
                        <img src="../../../../../static/img/icons/spark.svg" alt="Flame"/>
                        <div>
                            <span>{userData.userEx.totalExerciseDone}</span>
                            <h2>Exercices terminés</h2>
                        </div>
                    </GridElement>
                </GridContainer>
                <h1>Expérience</h1>
                <div>

                </div>
                <h1>Succès</h1>
                <SuccessContainer>

                </SuccessContainer>
            </BodyProfileSectionContainer>
            <BodyProfileAsideContainer>
                <h1>Amis</h1>
                <Subscribers
                    isSearch={isSearch}
                    data={isSearch ? {currentUserData: data.currentUserData , searchedUser: data.searchedUser} : {currentUserData: data.currentUserData, userFriends: cacheManager.getFriendsCache()}}
                />

                {!isSearch ?
                    <>
                        <ButtonCard
                            title= "Trouver des amis"
                            desc= "Chercher d'autres membres de la communauté"
                            imageURL= "../../../../../static/img/icons/find.png"
                            link= "/user-search"
                            alt= "Search some friends"
                        />
                        <ButtonCard
                            title= "Rejoindre une classe"
                            desc= "Apprendre à plusieurs, c'est encore mieux !"
                            imageURL= "../../../../../static/img/icons/class.png"
                            link= "/class"
                            alt= "Join a class"
                        />
                    </>
                    :
                    <ButtonCard
                        title= "Trouver des amis"
                        desc= "Chercher d'autres membres de la communauté"
                        imageURL= "../../../../../static/img/icons/find.png"
                        link= "/user-search"
                        alt= "Search some friends"
                    />
                }
            </BodyProfileAsideContainer>
        </BodyProfileContainer>
    )
}

export default BodyProfile;