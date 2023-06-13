import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { styled } from "twin.macro";

// Context
import {useAuth} from "../../../../context/AuthContext.js";
import {useCache} from "../../../../context/cache/CacheManager.js";

// Styled components
import {Container} from "../../../../components/utils/ui/GlobalStyle.js";
import {
    ElementDiv,
    HeaderContainer,
    InputContainer,
    Content, SearchResultContainer, SearchContainer
} from "../../styles/SearchStyle.js";

// Icons
import {FaChevronRight, FaSearch} from "react-icons/fa";

const Search = () => {
    // Context
    const auth = useAuth();
    const cacheManager = useCache();

    // States
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
            <Content>
                <HeaderContainer>
                    <div>
                        <h1>Rechercher des utilisateurs</h1>
                    </div>
                    <InputContainer>
                        <FaSearch />
                        <input id="searchInput" type="text" placeholder="Nom d'utilisateur"/>
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
                                                console.log(user);
                                                return (
                                                    <ElementDiv key={index}>
                                                        <Link to={"/profile/" + user.username}>
                                                            <img src={user.photo} alt="profile picture"/>
                                                            <span>{user.displayName}</span>
                                                            <FaChevronRight />
                                                        </Link>
                                                    </ElementDiv>
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