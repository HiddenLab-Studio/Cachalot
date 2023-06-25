import React from 'react';
import tw, { styled } from "twin.macro";
import {Link} from "react-router-dom";

const ClassCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  padding: 16px;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.buttonBgHover};
  }
  h2 {
    font-size: var(--fs-s);
    font-family: "Din_Round_Bold", sans-serif;
    color: ${props => props.theme.text};
  }
`;

// Icons
import { FaChevronRight } from "react-icons/fa";

const ClassCard = ({ classData }) => {
    console.log(classData);

    return (
        <Link to={"/class/" + classData.code}>
            <ClassCardContainer>
                <h2>{classData.data.name}</h2>
                <div tw="flex items-center justify-end grow-[1]">
                    <FaChevronRight />
                </div>
            </ClassCardContainer>
        </Link>
    )
}

export default ClassCard;