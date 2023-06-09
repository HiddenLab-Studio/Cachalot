import {
    BodyProfileAsideContainer,
    BodyProfileContainer,
    BodyProfileSectionContainer
} from "../styles/ProfilePageStyle.js";
import Subscribers from "./subComponents/Subscribers.jsx";

const BodyProfile = () => {
    return (
        <BodyProfileContainer>
            <BodyProfileSectionContainer>
                <h1>Statistiques</h1>
                <div>

                </div>
            </BodyProfileSectionContainer>
            <BodyProfileAsideContainer>
                <h1>Amis</h1>
                <Subscribers />
            </BodyProfileAsideContainer>
        </BodyProfileContainer>
    )
}

export default BodyProfile;