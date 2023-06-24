import React, {useEffect, useState} from "react";
import tw, {styled} from "twin.macro";

// Data
import {data, frenchFunctions} from "../../../../functions/FrenchExerciseGenerator.js";

// Styled components
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  padding: 8px;
  background-color: ${props => props.current ? props.theme.buttonBgHover : null};
  transition: all 0.2s ease-in-out;
  span {
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-s);
    color: ${props => props.theme.text};
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    background-color: ${props => props.theme.buttonBgHover};
  }
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    span {
      font-size: var(--fs-sss);
    }
  }
`;
const Container = styled.div`
  top: 0;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

const SelectorClassFrench = ({setState}) => {

    const [classType, setClassType] = useState("CP");

    useEffect(() => {
        setState("class", classType);
    }, []);

    return (
        <Container>
            {data.validClassType.map(type => {
                return (
                    <Button
                        key={type}
                        current={classType === type}
                        onClick={() => {
                            setClassType(type);
                            setState("class", type);
                        }}>
                        <span>{type}</span>
                    </Button>
                )
            })}
        </Container>
    )
}

export default SelectorClassFrench;