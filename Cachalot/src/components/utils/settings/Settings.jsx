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

const Settings = () => {
    // Context
    const auth = useAuth();
    const userData = auth.userData;

    // State
    const [isLoading, setIsLoading] = useState(true);
    const [onChanges, setOnChanges] = useState(false);

    useEffect(() => {
        if(auth.currentUser instanceof Object || typeof auth.currentUser === "number"){
            if (auth.currentUser instanceof Object) {
                loadXpCache(auth.currentUser, setIsLoading)
            } else {
                setIsLoading(false)
            }
        }
    }, [auth.currentUser])

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


    if(isLoading) {
        return <Loading />
    } else if(auth.currentUser instanceof Object) {
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
    } else if(typeof auth.currentUser === "number") {
        window.location.pathname = "/profile";
    }

}

export default Settings;