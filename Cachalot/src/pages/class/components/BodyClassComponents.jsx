import React, {useRef, useState} from "react";

import ClassTitle from "./subComponents/ClassTitle.jsx";
import ClassJoinGameContainer from "./subComponents/ClassJoinGame.jsx";
import ClassDelete from "./subComponents/ClassDelete.jsx";
import ClassWork from "./subComponents/ClassWork.jsx";

//styled components
import {BodyClassContainer} from "../styles/BodyClassStyleTest.js";


const BodyClass = ({auth}) => {
    // State

    return (
        <BodyClassContainer>
            <ClassTitle auth={auth} />
            <ClassJoinGameContainer auth={auth} />
            <ClassWork auth={auth} />
            <ClassDelete auth={auth} />
        </BodyClassContainer>
    )
}

export default BodyClass;