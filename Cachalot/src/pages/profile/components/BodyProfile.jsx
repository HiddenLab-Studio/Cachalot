import {
    BodyProfileAsideContainer,
    BodyProfileContainer,
    BodyProfileSectionContainer
} from "../styles/ProfilePageStyle.js";
import Subscribers from "./subComponents/Subscribers.jsx";
import {useCache} from "../../../context/cache/CacheManager.js";

const BodyProfile = ({isSearch, data}) => {
    const cacheManager = useCache();

    console.info("BodyProfile data:");
    console.log(data)

    return (
        <BodyProfileContainer>
            <BodyProfileSectionContainer>
                <h1>Statistiques</h1>
                <div>

                </div>
            </BodyProfileSectionContainer>
            <BodyProfileAsideContainer>
                <h1>Amis</h1>
                <Subscribers
                    isSearch={isSearch}
                    data={isSearch ? {currentUserData: data.currentUserData , searchedUser: data.searchedUser} : {currentUserData: data.currentUserData, userFriends: cacheManager.getFriendsCache()}}
                />
            </BodyProfileAsideContainer>
        </BodyProfileContainer>
    )
}

export default BodyProfile;