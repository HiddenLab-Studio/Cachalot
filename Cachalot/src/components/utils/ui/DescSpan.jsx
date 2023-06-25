import React from 'react';
import { styled } from "twin.macro";

const Description = styled.span`
  font-family: "Din_Round",sans-serif;
  font-size: var(--fs-s);
  color: ${props => props.theme.subText};
  text-align: justify;
`;

const descSpan = ({desc}) => {
    return (
        <Description>
            {desc}
        </Description>
    )
}

export default descSpan;