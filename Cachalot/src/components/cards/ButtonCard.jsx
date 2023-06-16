import React from "react";
import tw, { styled } from "twin.macro";

// Icons
import { FaChevronRight } from "react-icons/fa";
import {Link} from "react-router-dom";

const CardInformationContainer = styled.div``;
const ButtonCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  width: 100%;
  padding: 16px;
  
  ${CardInformationContainer} {
    display: flex;
    flex-direction: column;
    h1 {
      font-size: var(--fs-sm);
      font-family: "Din_Round_Bold", sans-serif;
      color: ${props => props.theme.text};
      /*max-width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;*/
    }

    span {
      max-width: 97%;
      font-family: "Din_Round_Med", sans-serif;
      font-size: var(--fs-ss);
      color: #afafaf;
      @media (max-width: 1050px) {
        max-width: 100%;
      }
    }
  }

  img {
    height: 64px;
    width: 64px;
  }

  svg {
    color: ${props => props.theme.iconColor};
  }

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.buttonBgHover};
  }
  
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
    .exercise__catalog, .exercise__creation {
      img {
        height: 32px !important;
        width: 32px !important;
      }
    }

    .quest__container {
      .container {
        h1 {
          font-size: var(--fs-xs) !important;
        }
      }
    }
  }

  @media (max-width: 500px) {
    span {
      max-width: 95%;
      word-break: break-word;
    }
  }
`;

const ButtonCard = ({ title, desc, imageURL, alt, link }) => {
    return (
        <Link to={link}>
            <ButtonCardContainer>
                <div className="flex flex-row items-center gap-[12px]">
                    <img src={imageURL} alt={alt}/>
                    <CardInformationContainer>
                        <h1>{title}</h1>
                        <span>{desc}</span>
                    </CardInformationContainer>
                </div>
                <div tw="flex grow-[1] justify-end">
                    <FaChevronRight />
                </div>
            </ButtonCardContainer>
        </Link>
    )
}

export default ButtonCard;