import React, {useRef, useState} from "react";

import ClassTitle from "./subComponents/ClassTitle.jsx";
import ClassJoinGameContainer from "./subComponents/ClassJoinGame.jsx";

//styled components
import {BodyClassContainer} from "../styles/BodyClassStyleTest.js";

const BodyClass = ({auth}) => {
    // State

    return (
        <BodyClassContainer>
            <ClassTitle auth={auth} />
            <ClassJoinGameContainer auth={auth} />
        </BodyClassContainer>
    )
}

export default BodyClass;