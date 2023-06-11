import React, { useState, useEffect } from "react";

// Context
import {useAuth} from "../../../../context/AuthContext.js";
import {useCache} from "../../../../context/cache/CacheManager.js";

// Styled components
import {
    ElementDiv,
    HeaderContainer,
    InputContainer,
    SearchContainer, SearchResultContainer
} from "../../styles/SearchStyle.js";

// Icons
import {FaChevronRight, FaSearch} from "react-icons/fa";
import {FriendsDiv} from "../../styles/SubscribersStyle.js";
import {Link} from "react-router-dom";
import FollowButton from "../profileComponents/subComponents/FollowButton.jsx";

const Search = () => {
    // Context
    const auth = useAuth();
    const cacheManager = useCache();

    const [search, setSearch] = useState([]);
    const [isSearching, setIsSearching] = useState(undefined);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    async function handleKeyDown(e) {
        if (e.key === "Enter") {
            let value = document.getElementById("searchInput").value.toLowerCase();
            if (value !== "") {
                console.info("Searching for " + value);
                setIsSearching(true);
                let result = await auth.getUsersListByUsername(value);
                setIsSearching(false);
                console.info("Result: ", result);
                if(result.length > 0) {
                    setSearch(result);
                }
            }
        }
    }

    return (
        <SearchContainer>
            <HeaderContainer>
                <div>
                    <h1>Rechercher des utilisateurs</h1>
                </div>
                <InputContainer>
                    <FaSearch />
                    <input id="searchInput" type="text" placeholder="Saisissez le nom d'utilisateur de la personne"/>
                </InputContainer>
            </HeaderContainer>
            <SearchResultContainer>
                {
                    isSearching !== undefined ?
                        isSearching ? <h1>Recherche...</h1>
                            :
                            <div className="map">
                                {
                                    search.map((user, index) => {
                                        console.log(user);
                                        return (
                                            <ElementDiv key={index}>
                                                <Link to={"/profile/" + user.username}>
                                                    <img src={user.photo} alt="profile picture"/>
                                                    <span>{user.username}</span>
                                                    <FaChevronRight />
                                                </Link>
                                            </ElementDiv>
                                        )
                                    })
                                }
                            </div>
                        : null
                }
            </SearchResultContainer>
        </SearchContainer>
    )
}

export default Search;