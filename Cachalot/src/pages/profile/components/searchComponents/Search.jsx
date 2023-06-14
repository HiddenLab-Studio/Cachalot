import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import tw from "twin.macro";

// Context
import {useAuth} from "../../../../context/AuthContext.js";
import {useCache} from "../../../../context/manager/cache/CacheManager.js";

// Components
import Loading from "../../../../components/utils/loading/Loading.jsx";

// Styled components
import {
    HeaderContainer,
    InputContainer,
    Content,
    SearchResultContainer,
    SearchContainer, ElementContainer, InformationContainer
} from "../../styles/SearchStyle.js";

// Icons
import {FaChevronRight, FaSearch} from "react-icons/fa";
import FollowButton from "../profileComponents/subComponents/FollowButton.jsx";

const Search = ({auth}) => {
    // States
    const [search, setSearch] = useState([]);
    const [isSearching, setIsSearching] = useState(undefined);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [])


    async function handleKeyDown(e) {
        if (e.key === "Enter") {
            let value = document.getElementById("searchInput").value.toLowerCase();
            if (value !== "") {
                console.info("Searching for " + value);
                setIsSearching(true);
                let result = await auth.utils.getUsersListByUsername(value);
                setIsSearching(false);
                console.info("Result: ", result);
                if(result.length > 0) {
                    setSearch(result);
                    console.log(result);
                } else {
                    setSearch([]);
                }
            }
        }
    }

    return (
        <SearchContainer>
            <Content>
                <HeaderContainer>
                    <div className="title">
                        <h1>Rechercher des amis !</h1>
                        <span>
                                Cette fonctionnalité vous permet de rechercher des utilisateurs par leur pseudonyme.
                            </span>
                    </div>
                    <InputContainer>
                        <FaSearch/>
                        <input id="searchInput" type="text" placeholder="Pseudo de l'utilisateur"/>
                    </InputContainer>
                </HeaderContainer>
                <SearchResultContainer>
                    {
                        isSearching !== undefined ?
                            isSearching ?
                                <div className="searching">
                                    <h2>Loading...</h2>
                                </div>
                                :
                                search.length > 0 ?
                                    <div className="map">
                                        {
                                            search.map((user, index) => {
                                                return (
                                                    <ElementContainer key={index}>
                                                        <Link to={"/profile/" + user.username}>
                                                            <InformationContainer tw="flex flex-row">
                                                                <img src={user.photo} alt="profile picture"/>
                                                                <div>
                                                                    <h2>{user.displayName}</h2>
                                                                    <span>@{user.username}</span>
                                                                </div>
                                                            </InformationContainer>
                                                        </Link>
                                                        <FaChevronRight/>
                                                    </ElementContainer>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className="userNotFound">
                                        <h2>Aucun utilisateur trouvé !</h2>
                                    </div>
                            : null
                    }

                </SearchResultContainer>
            </Content>
        </SearchContainer>
    )
}

export default Search;