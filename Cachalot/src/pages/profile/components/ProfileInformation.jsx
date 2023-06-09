import tw, { styled } from "twin.macro";

// Icons
import {
    FaClock,
    FaPeopleCarry,
    FaMagic
} from "react-icons/fa";

// Styled components
import {
    ImgWrapper
} from "../../../components/ui/GlobalStyle.js";


const InformationContainer = styled.div``;
const ProfileInformationContainer = styled.div`
  display: flex;
  gap: 32px;
  padding: 0 0 24px;
  border-bottom: 2px solid ${props => props.theme.borderRightColor};
  
  ${InformationContainer} {
    display: flex;
    flex-direction: column;
    
    .profile__name {
      font-family: "Din_Round_Bold", sans-serif;
      font-weight: 400;
      color: ${props => props.theme.text};
      font-size: var(--fs-sl);
      line-height: 2.125rem;
      margin: 0 0 16px;
      word-break: break-word;
      div {
        font-family: "Din_Round", sans-serif;
        color: ${props => props.theme.subText};
        font-size: var(--fs-s);
        font-weight: 500;
        line-height: 20px;
      }
    }
    
    .profile__info {
      display: flex;
      flex-direction: column;
      gap: 3px;
      div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        font-family: "Din_Round", sans-serif;
        color: ${props => props.theme.iconColor};
        span {
          color: ${props => props.theme.textWithIcon};
        }
      }
    }
    
  }
`

// Components
import Showcase from "./subComponents/Showcase.jsx";

const ProfileInformation = (props) => {
    return (
        <ProfileInformationContainer>
            <ImgWrapper width="180px">
                <img src={props.userData.photo} alt="ProfilePicture"/>
            </ImgWrapper>
            <InformationContainer>
                <div className="profile__name">
                    <span>{props.userData.username}</span>
                    <div>{props.userData.email}</div>
                </div>
                <div className="profile__info">
                    <div>
                        <FaClock />
                        <span>Membre depuis le VARIABLE</span>
                    </div>
                    <div>
                        <FaPeopleCarry />
                        <span>X abonnements / X abonnés</span>
                    </div>
                    <div>
                        <FaMagic />
                        <span>X expériences cumulés</span>
                    </div>
                </div>
            </InformationContainer>
            <Showcase userData={props.userData} />
        </ProfileInformationContainer>
    )
}

export default ProfileInformation;