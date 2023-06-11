import React from "react";

// Styled components
import {
    Container
} from "../../../components/ui/GlobalStyle.js";

// Components
import Navbar from "../../../components/navbar/Navbar.jsx";
import Search from "./searchComponents/Search.jsx";

const SearchUser = () => {
    return (
        <Container>
            <Navbar />
            <Search />
        </Container>
    )
}

export default SearchUser;