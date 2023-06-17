import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

// styled components
import {
    LinkDiv,
} from "../NavbarStyle.js";

const LinkElement = (props) => {
    const isOnTablet = useMediaQuery({ query: '(max-width: 1200px)' });

    function isCurrent(pathname = ""){ return pathname === window.location.pathname.split('/')[1]; }

    return (
        <Link to={"/" + props.to}>
            <LinkDiv current={isCurrent(props.to) ? "true" : "false"}>
                <img src={props.picture !== undefined ? ("../../../static/img/icons/" + props.picture) : props.profilePicture} alt={props.alt}/>
                {isOnTablet ? "" : <span>{props.content}</span>}
            </LinkDiv>
        </Link>
    )
}

export default LinkElement;
