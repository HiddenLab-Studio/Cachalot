import React from "react";

// Styled components
import {
    MainContainer
} from "../../../components/utils/ui/GlobalStyle.js";

// Components
import Navbar from "../../../components/navbar/Navbar.jsx";
import Search from "./searchComponents/Search.jsx";

const SearchUser = () => {
    return (
        <MainContainer>
            <Navbar />
            <Search />
        </MainContainer>
    )
}

export default SearchUser;