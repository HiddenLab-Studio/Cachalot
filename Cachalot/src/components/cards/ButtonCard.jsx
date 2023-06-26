import React from "react";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";

// Icons
import { FaChevronRight } from "react-icons/fa";

const ChevronRightWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: end;
  margin-left: 12px;
  svg {
    color: ${props => props.theme.iconColor};
  }
`;

const CardInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: var(--fs-sm);
    font-family: "Din_Round_Bold", sans-serif;
    color: ${props => props.theme.text};
  }
  span {
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-ss);
    color: #afafaf;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  img {
    height: 64px;
    width: 64px;
  }
`;

const ButtonCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  width: 100%;
  padding: 16px;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.buttonBgHover};
  }
`;

const ButtonCard = ({ title, desc, imageURL, alt, link }) => {
    return (
        <Link to={link}>
            <ButtonCardContainer>
                <ContentContainer>
                    <img src={imageURL} alt={alt}/>
                    <CardInformationContainer>
                        <h1>{title}</h1>
                        <span>{desc}</span>
                    </CardInformationContainer>
                </ContentContainer>
                <ChevronRightWrapper>
                    <FaChevronRight />
                </ChevronRightWrapper>
            </ButtonCardContainer>
        </Link>
    )
}

export default ButtonCard;