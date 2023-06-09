import tw, { styled } from "twin.macro";

// Icons
import {
    FaClock,
    FaUserAlt,
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
import {useCache} from "../../../context/cache/CacheManager.js";

const ProfileInformation = ({isSearch, data}) => {
    const cacheManager = useCache();

    console.log(data);
    const userData = isSearch ? data.searchedUser.userData : data.currentUserData;
    const userFriends = isSearch ? data.searchedUser.userFriends : cacheManager.getFriendsCache();
    const currentXp = isSearch ? data.searchedUser.userData.userXp.currentXp : data.currentUserData.userXp.currentXp;

    return (
        <ProfileInformationContainer>
            <ImgWrapper width="180px">
                <img src={userData.photo} alt="ProfilePicture"/>
            </ImgWrapper>
            <InformationContainer>
                <div className="profile__name">
                    <span>{userData.username}</span>
                    {!isSearch ?
                        <div>{userData.email}</div>
                    :
                        null
                    }
                </div>
                <div className="profile__info">
                    <div>
                        <FaClock />
                        <span>Membre depuis le A FAIRE</span>
                    </div>
                    <div>
                        <FaUserAlt />
                        <span>{userFriends.following.length} abonnements / {userFriends.follower.length} abonnés</span>
                    </div>
                    <div>
                        <FaMagic />
                        <span>{currentXp} expériences cumulés</span>
                    </div>
                </div>
            </InformationContainer>
            <Showcase
                isSearch={isSearch}
                data={isSearch ? {currentUserData: data.currentUserData , searchedUser: data.searchedUser} : {currentUserData: data.currentUserData, userFriends: cacheManager.getFriendsCache()}}
            />
        </ProfileInformationContainer>
    )
}

export default ProfileInformation;