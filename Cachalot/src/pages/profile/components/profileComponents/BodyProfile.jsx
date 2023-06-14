import React from "react";
import tw from "twin.macro";

// Context
import {useCache} from "../../../../context/manager/cache/CacheManager.js";

// Styled components
import {
    BodyProfileAsideContainer,
    BodyProfileContainer,
    BodyProfileSectionContainer,
    FindFriendsContainer, GridContainer, GridElement,
    JoinClassContainer, SuccessContainer
} from "../../styles/ProfilePageStyle.js";

// Components
import { Link } from "react-router-dom";
import Subscribers from "./subComponents/Subscribers.jsx";

// Icons
import { FaChevronRight } from "react-icons/fa";


const BodyProfile = ({isSearch, data}) => {
    const cacheManager = useCache();

    //console.info("BodyProfile data:");
    //console.log(data)

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
                            <span>0</span>
                            <h2>Xp gagnés</h2>
                        </div>
                    </GridElement>
                </GridContainer>
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
                        <Link to={"/user-search"}>
                            <FindFriendsContainer>
                                <img src="../../../../../static/img/icons/find.png" alt="Search some friends"/>
                                <div>
                                    <h1>Trouver des amis</h1>
                                    <span>Chercher d'autres membres de la communauté</span>
                                </div>
                                <div className="chevron">
                                    <FaChevronRight />
                                </div>
                            </FindFriendsContainer>
                        </Link>
                        <Link to={"/class"}>
                            <JoinClassContainer>
                                <img src="../../../../../static/img/icons/class.png" alt="Join a class"/>
                                <div>
                                    <h1>Rejoindre une classe</h1>
                                    <span>Apprendre à plusieurs, c'est encore mieux !</span>
                                </div>
                                <div className="chevron">
                                    <FaChevronRight />
                                </div>
                            </JoinClassContainer>
                        </Link>
                    </>
                    :
                    <Link to={"/user-search"}>
                        <FindFriendsContainer>
                            <img src="../../../../../static/img/icons/find.png" alt="Search some friends"/>
                            <div>
                                <h1>Trouver des amis</h1>
                                <span>Chercher d'autres membres de la communauté</span>
                            </div>
                            <div className="chevron">
                                <FaChevronRight />
                            </div>
                        </FindFriendsContainer>
                    </Link>
                }
            </BodyProfileAsideContainer>
        </BodyProfileContainer>
    )
}

export default BodyProfile;