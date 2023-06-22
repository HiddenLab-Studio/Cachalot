import React, {useRef, useState} from "react";

import ClassTitle from "./subComponents/ClassTitle.jsx";

//styled components
import {BodyClassContainer} from "../styles/BodyClassStyleTest.js";

const BodyClass = ({auth}) => {
    // State

    return (
        <BodyClassContainer>
            <ClassTitle auth={auth} />
        </BodyClassContainer>
    )
}

export default BodyClass;