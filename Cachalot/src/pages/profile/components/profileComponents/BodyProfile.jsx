import React from "react";
import tw from "twin.macro";

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
import Subscribers from "./subComponents/Subscribers.jsx";
import ButtonCard from "../../../../components/cards/ButtonCard.jsx";
import xpCacheManager from "../../../../context/manager/cache/xpCacheManager.js";
import {useCache} from "../../../../context/manager/cache/CacheProvider.js";

const BodyProfile = ({isSearch, data}) => {
    const cache = useCache();

    // data
    let userData = isSearch ? data.searchedUser.userData : data.currentUserData;
    let userXp = isSearch ? data.searchedUser.userData.userXp : cache.xpCache.getXpCache();
    let userFriends = isSearch ? data.searchedUser.userFriends : data.userFriends;

    console.log(userData);

    return (
        <BodyProfileContainer>
            <BodyProfileSectionContainer>
                <h1>Statistiques</h1>
                <GridContainer className="gridContainer">
                    <GridElement tw="flex flex-row">
                        <img src="../../../../../static/img/icons/flameStreak.svg" alt="Flame"/>
                        <div>
                            <span>{userData.cumulatedDays}</span>
                            <h2>Jours d'affilée</h2>
                        </div>
                    </GridElement>
                    <GridElement>
                        <img src="../../../../../static/img/icons/dumbbell.png" alt="Dumbbell"/>
                        <div>
                            <span>{userData.userExercise.totalTrainingDone}</span>
                            <h2>Entrainements terminés</h2>
                        </div>
                    </GridElement>
                    <GridElement>
                        <img src="../../../../../static/img/icons/chest.png" alt="Quest"/>
                        <div>
                            <span>0</span>
                            <h2>Quêtes terminées</h2>
                        </div>
                    </GridElement>
                    <GridElement>
                        <img src="../../../../../static/img/icons/exercise.png" alt="Exercise"/>
                        <div>
                            <span>{userData.userExercise.totalExerciseDone}</span>
                            <h2>Exercices terminés</h2>
                        </div>
                    </GridElement>
                </GridContainer>
                <h1>Expérience</h1>
                <GridContainer className="gridContainer">
                    <GridElement tw="flex flex-row">
                        <img src="../../../../../static/img/icons/xp.png" alt="Xp"/>
                        <div>
                            <span>{userXp.currentXp}</span>
                            <h2>Xp actuels ({userXp.currentXp}/{cache.xpCache.getRequiredXp(userXp.currentLvl)})</h2>
                        </div>
                    </GridElement>
                    <GridElement>
                        <img src="../../../../../static/img/icons/spark.svg" alt="Flame"/>
                        <div>
                            <span>{userXp.cumulatedXp}</span>
                            <h2>Xp cumulés</h2>
                        </div>
                    </GridElement>
                </GridContainer>
                <h1>Succès</h1>
                <SuccessContainer>
                    WIP
                </SuccessContainer>
            </BodyProfileSectionContainer>
            <BodyProfileAsideContainer>
                <h1 className="title">Amis</h1>
                <Subscribers
                    isSearch={isSearch}
                    data={isSearch ? {currentUserData: data.currentUserData , searchedUser: data.searchedUser} : {currentUserData: data.currentUserData, userFriends: userFriends}}
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
                            title= "Mes classes"
                            desc= "Apprendre à plusieurs, c'est encore mieux !"
                            imageURL= "../../../../../static/img/icons/class.png"
                            link= "/my-class"
                            alt= "Your classes"
                        />
                        <ButtonCard
                            title="Entrainements"
                            desc="Rien de mieux que de s'entrainer pour progresser !"
                            imageURL="../../../../static/img/icons/dumbbell.png"
                            alt="Training"
                            link="/training"
                        />
                    </>
                    :
                    <>
                        <ButtonCard
                            title= "Trouver des amis"
                            desc= "Chercher d'autres membres de la communauté"
                            imageURL= "../../../../../static/img/icons/find.png"
                            link= "/user-search"
                            alt= "Search some friends"
                        />
                    </>
                }
            </BodyProfileAsideContainer>
        </BodyProfileContainer>
    )
}

export default BodyProfile;