import React from "react";
import tw, { styled } from "twin.macro";

// icons
import {FcLike} from "react-icons/fc";
import {Link} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

// Styled Components
const Element = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  padding: 16px;
  gap: 16px;

  .title__desc__and__id {
    display: flex;
    flex-direction: row;
    flex-grow: 1;

    .title {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 4px;

      h1 {
        font-family: "Din_Round_Bold", sans-serif;
        color: ${props => props.theme.text};
        font-size: var(--fs-sm);
        max-width: 192px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        @media (max-width: 768px) {
          max-width: 256px;
        }
        @media (max-width: 425px) {
          max-width: 192px;
        }
      }

      h2 {
        font-family: "Din_Round_Med", sans-serif;
        color: ${props => props.theme.subText};
        font-size: var(--fs-ss);
        max-width: calc(95%);
        text-align: justify;
      }
    }

    .id {
      display: flex;
      flex-direction: row;
      gap: 4px;

      span {
        font-family: "Din_Round_Med", sans-serif;
        color: ${props => props.theme.subText};
        font-size: var(--fs-ss);
      }
    }

  }

  .type__and__like {
    display: flex;
    flex-direction: row;

    .type {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      
      span {
        font-family: "Din_Round", sans-serif;
        color: ${props => props.theme.subText};
        font-size: var(--fs-xs);
        max-width: 192px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        @media (max-width: 768px) {
          max-width: 256px;
        }
        @media (max-width: 425px) {
          max-width: 150px;
        }
      }

      img {
        width: 24px;
        height: 24px;
      }
    }

    .like {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: end;
      gap: 4px;
      flex-grow: 1;

      span {
        font-family: "Din_Round_Med", sans-serif;
        color: ${props => props.theme.subText};
        font-size: var(--fs-ss);

      }

      svg {
        font-size: var(--fs-s);
      }
    }
  }

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.buttonBgHover};
  }
`;


const ExerciseCatalogCard = ({id, author, title, description, type, like, date}) => {
    const isOnMobile = useMediaQuery({query: "(max-width: 768px)"});
    return (
        <Element onClick={() => window.location.pathname = "/exercise/" + id}>
            <div className="title__desc__and__id">
                <div className="title">
                    <h1>{title}</h1>
                    <h2>{description}</h2>
                </div>
                <div className="id">
                    <span>#{id}</span>
                </div>
            </div>
            <div className="type__and__like">
                <div className="type">
                    {
                        type === "french" ?
                            <img src="../../../../../../../../static/img/icons/french.png" alt="French"/>
                            :
                            type === "math" ?
                                    <img src="../../../../../../../../static/img/icons/math.png" alt="Math"/>
                                :
                                type === "other" ?
                                        <img src="../../../../../../../../static/img/icons/other.png" alt="Other"/>
                                    :
                                        null

                    }
                    <span>
                        Par @{author}{!isOnMobile ? ", le " + date : null}
                    </span>
                </div>
                <div className="like">
                    <FcLike />
                    <span>{like}</span>
                </div>
            </div>
        </Element>
    )
}

export default ExerciseCatalogCard;