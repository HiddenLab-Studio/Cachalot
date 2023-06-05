import tw from "twin.macro";
import {useAuth} from "../../../context/AuthContext.js";

// Icons
import { FaClock } from "react-icons/fa";

// Styled components
import {
    AccountInformationContainer,
    Container, ProfileContainer,
} from "../styles/ProfilePageStyle.js";

import {
    ImgWrapper
} from "../../../components/ui/GlobalStyle.js";

const Profile = () => {
    const auth = useAuth();

    // TODO: Need to change auth.object
    return (
        <Container>
            <ProfileContainer>
                <ImgWrapper width="192px">
                    <img src={"../../../../static/img/" + auth.object.profilePicture} alt="Medal"/>
                </ImgWrapper>
                <AccountInformationContainer>
                    <div className="title" tw="flex flex-col leading-6">
                        <h1>{auth.object.username}</h1>
                        <span>lezizou@gmail.com</span>
                    </div>
                    <div className="info">
                        <div>
                            <FaClock/>
                            <span>Membre depuis {"janvier 2023"}</span>
                        </div>
                        <div>
                            <span>Classe: {"CM1"}</span>
                        </div>
                    </div>
                </AccountInformationContainer>
            </ProfileContainer>
        </Container>
    )
}

export default Profile;