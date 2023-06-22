import React from "react";
import tw from "twin.macro";
import {Link} from "react-router-dom";

// Components
import ClassChatContainer from "./subComponents/ClassChat.jsx";
import ClassInfoUsers from "./subComponents/ClassInfoUsers.jsx";

// Styled Components
import {
    AsideTrainingContainer,
} from "../styles/AsideClassStyle.js";   

const AsideClass = ({auth}) => {


    return (
        <AsideTrainingContainer>
            <ClassChatContainer auth={auth} />
            <ClassInfoUsers auth={auth} />
        </AsideTrainingContainer>
    )
}



export default AsideClass;