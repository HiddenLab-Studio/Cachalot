import tw, { styled } from "twin.macro";

// Context
import {useCache} from "../../../../context/manager/cache/CacheManager.js";

// Icons
import {
    FaClock,
    FaUserAlt,
    FaMagic
} from "react-icons/fa";

const InformationContainer = styled.div``;
const ProfileInformationContainer = styled.div`
  display: flex;
  gap: 32px;
  padding: 0 0 24px;
  border-bottom: 2px solid ${props => props.theme.borderRightColor};

  .imgWrapper {
    display: flex;
    justify-content: center;
    img {
      width: 180px;
      height: 180px;
      border: 1px solid black;
      border-radius: 50%;
    }
  }
  
  ${InformationContainer} {
    display: flex;
    flex-direction: row;
    gap: 24px;
    
    .info {
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
  }

  // Responsive
  @media (min-width: 768px) and (max-width: 1200px) {
    .imgWrapper {
      img {
        width: 128px;
        height: 128px;
      }
    }
    
    ${InformationContainer} {
      .profile__name {
        font-size: var(--fs-m);
      }
      .profile__info {
        span {
          font-size: var(--fs-ss);
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    
    .imgWrapper {
      display: flex;
      align-items: center;
      img {
        width: 110px;
        height: 110px;
      }
    }
    
    ${InformationContainer} {
      .info {
        flex-grow: 1;
        .profile__name {
          font-size: var(--fs-sl);
        }
        .profile__info {
          span {
            font-size: var(--fs-s);
          }
        }
      }
    }
  }

  @media (max-width: 400px) {
    flex-direction: column;
    gap: 16px;

    .imgWrapper {
      display: flex;
      align-items: center;
      img {
        width: 92px;
        height: 92px;
      }
    }

    ${InformationContainer} {
      .info {
        flex-grow: 1;
        .profile__name {
          font-size: var(--fs-m);
        }
        .profile__info {
          span {
            font-size: var(--fs-ss);
          }
        }
      }
    }
  }
  
`

// Components
import Showcase from "./subComponents/Showcase.jsx";
import {useMediaQuery} from "react-responsive";

const ProfileInformation = ({isSearch, data}) => {
    const cacheManager = useCache();

    //console.log(data);
    const userData = isSearch ? data.searchedUser.userData : data.currentUserData;
    const userFriends = isSearch ? data.searchedUser.userFriends : cacheManager.getFriendsCache();
    const currentXp = isSearch ? data.searchedUser.userData.userXp.currentXp : data.currentUserData.userXp.currentXp;

    // Responsive
    const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });
    function getCreationData(){
        const date = new Date(userData.accountCreationDate);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }


    return (
        <ProfileInformationContainer>
            <InformationContainer>
                <div className="imgWrapper">
                    <img src={userData.photo} alt="ProfilePicture"/>
                </div>
                <div className="info">
                    <div className="profile__name">
                        <span>{userData.displayName}</span>
                        {!isSearch ?
                            <div>@{userData.username}</div>
                            :
                            null
                        }
                    </div>
                    <div className="profile__info">
                        <div>
                            <FaClock />
                            <span>Membre depuis le {getCreationData()}</span>
                        </div>
                        <div>
                            <FaUserAlt />
                            <span>{userFriends.following.length} abonnements / {userFriends.follower.length} abonnés</span>
                        </div>
                    </div>
                </div>
            </InformationContainer>
            {isOnMobile ?
                isSearch ?
                        <Showcase
                            isSearch={isSearch}
                            data={isSearch ? {currentUserData: data.currentUserData , searchedUser: data.searchedUser} : {currentUserData: data.currentUserData, userFriends: cacheManager.getFriendsCache()}}
                        />
                    :
                        null
                :
                <Showcase
                    isSearch={isSearch}
                    data={isSearch ? {currentUserData: data.currentUserData , searchedUser: data.searchedUser} : {currentUserData: data.currentUserData, userFriends: cacheManager.getFriendsCache()}}
                />
            }
        </ProfileInformationContainer>
    )
}

export default ProfileInformation;