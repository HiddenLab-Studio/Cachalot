import React from "react";
import tw from "twin.macro";
import {Link} from "react-router-dom";

// Components
import ClassChatContainer from "./subComponents/ClassChat.jsx";
import ClassInfoUsers from "./subComponents/ClassInfoUsers.jsx";
import CreateClassGameContainer from "./subComponents/ClassCreateGame.jsx";

// Styled Components
import {
    AsideClassContainer,
} from "../styles/AsideClassStyle.js";   

const AsideClass = ({auth}) => {



    return (
        <AsideClassContainer>
            <ClassInfoUsers auth={auth} />
            <CreateClassGameContainer auth={auth} />
            <ClassChatContainer auth={auth} />
        </AsideClassContainer>
    )
}



export default AsideClass;