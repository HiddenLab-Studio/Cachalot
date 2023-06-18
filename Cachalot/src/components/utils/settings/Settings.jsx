import React, { useEffect, useState } from 'react';
import tw, { styled } from "twin.macro";

// Context
import { useAuth } from "../../../context/AuthContext.js";

// Components
import Navbar from "../../navbar/Navbar.jsx";
import Loading from "../loading/Loading.jsx";

// Styled Components
import { MainContainer } from "../ui/GlobalStyle.js";
import {
    ApplyChangesButtonContainer,
    Content,
    SettingsContainer
} from "./style/SettingStyle.js";

import { FcSettings } from "react-icons/fc";
import loadXpCache from "../../../utils/onLoading.js";
import FullLoading from "../loading/FullLoading.jsx";
import ConnectionHomePage from "../../../pages/connection/ConnectionHomePage.jsx";
import {useCache} from "../../../context/manager/cache/CacheProvider.js";

const Settings = () => {
    // Context
    const auth = useAuth();
    const cache = useCache();
    const userData = auth.userData;

    // State
    const [isLoading, setIsLoading] = useState(!cache.isUserCached);
    const [onChanges, setOnChanges] = useState(false);

    async function handleClick() {
        let filePhoto = document.getElementById("image").files[0]
        let photoURL = "";
        
        if(filePhoto !== undefined) {
            photoURL = await URL.createObjectURL(filePhoto);
        }
        const data = {
            displayName: document.getElementById("displayName").value,
            age: document.getElementById("age").value,
            photo : photoURL
        }
        await auth.update.updateUserData(data);
    }

    if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage />
    } else {
        if(isLoading){
            return <FullLoading setIsLoading={setIsLoading} />
        } else {
            return (
                <MainContainer>
                    <Navbar />
                    <SettingsContainer>
                        <Content>
                            <h1 tw="flex flex-row gap-[8px] items-center"><FcSettings /> Paramètres</h1>
                            <table className="TableContainer">
                                <tbody>
                                <tr>
                                    <td>
                                        <h2>Photo de profil</h2>
                                    </td>
                                    <td>
                                        <input type="file" id="image" accept="image/*"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h2>Nom d'utilisateur</h2>
                                    </td>
                                    <td>
                                        <input type="text" id="displayName" placeholder={userData.displayName} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h2>Âge</h2>
                                    </td>
                                    <td>
                                        <input type="number" id="age" placeholder={userData.age}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <ApplyChangesButtonContainer change={onChanges}>
                                <button onClick={async () => await handleClick()}>Enregistrer les modifications</button>
                            </ApplyChangesButtonContainer>
                            <button onClick={async () => {
                                let result = await auth.user.logout();
                                if(result) {
                                    auth.setUserData(null);
                                    console.log(userData);
                                    console.info("Sign-out successful.")
                                } else {
                                    console.error("Sign-out failed.")
                                }

                            }} >
                                Se déconnecter
                            </button>
                        </Content>
                    </SettingsContainer>
                </MainContainer>
            )
        }
    }
}

export default Settings;