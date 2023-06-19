import React, { useEffect, useState } from 'react';
import tw, { styled } from "twin.macro";

// Context
import { useAuth } from "../../../context/AuthContext.js";
import {useCache} from "../../../context/manager/cache/CacheProvider.js";

// Components
import Navbar from "../../navbar/Navbar.jsx";
import Loading from "../loading/Loading.jsx";
import FullLoading from "../loading/FullLoading.jsx";
import ConnectionHomePage from "../../../pages/connection/ConnectionHomePage.jsx";

// Styled Components
import { MainContainer } from "../ui/GlobalStyle.js";
import {
    ApplyChangesButtonContainer, Button,
    Content, DisconnectButton,
    SettingsContainer
} from "./style/SettingStyle.js";

// icons
import { FcSettings } from "react-icons/fc";
import {useNavigate} from "react-router-dom";

const Settings = () => {
    // Context
    const navigate = useNavigate();
    const auth = useAuth();
    const cache = useCache();
    const userData = auth.userData;

    // State
    const [isLoading, setIsLoading] = useState(!cache.isUserCached);
    const [onChanges, setOnChanges] = useState(false);

    async function handleClick() {
        let filePhoto = document.getElementById("image").files[0]
        let photoURL = "";
        if(onChanges){
            setOnChanges(false);
            if(filePhoto !== undefined) photoURL = URL.createObjectURL(filePhoto);
            const data = {
                displayName: document.getElementById("displayName").value,
                age: document.getElementById("age").value,
                photo : photoURL
            }
            let result = await auth.update.updateUserData(data);
            if(result) window.location.pathname = "/profile";
            else alert("Une erreur est survenue");
        }
    }
    function handleChange(){
        let inputList = document.getElementsByTagName("input");
        inputList = Array.from(inputList);
        let isInputsValueChanged = false;
        inputList.forEach( (input) => {
            if(input.value.length > 0) isInputsValueChanged = true;
        });
        if(isInputsValueChanged) setOnChanges(true);
        else setOnChanges(false);
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
                                        <input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if(e.target.value.length > 0) setOnChanges(true);
                                                else handleChange();
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h2>Nom d'utilisateur</h2>
                                    </td>
                                    <td>
                                        <input
                                            type="text" id="displayName"
                                            placeholder={userData.displayName}
                                            onChange={(e) => {
                                                if(e.target.value.length > 0) setOnChanges(true);
                                                else handleChange();
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h2>Âge</h2>
                                    </td>
                                    <td>
                                        <input
                                            type="number" id="age"
                                            placeholder={userData.age}
                                            onChange={(e) => {
                                                if(e.target.value.length > 0) {
                                                    if(e.target.value >= 6 && e.target.value <= 99) {
                                                        setOnChanges(true)
                                                    } else {
                                                        e.target.value = "6";
                                                    }
                                                } else {
                                                    handleChange();
                                                }
                                            }}
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <ApplyChangesButtonContainer>
                                <Button change={onChanges} onClick={async () => await handleClick()}>
                                    Enregistrer les modifications
                                </Button>
                                <DisconnectButton onClick={async () => {
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
                                </DisconnectButton>
                            </ApplyChangesButtonContainer>


                        </Content>
                    </SettingsContainer>
                </MainContainer>
            )
        }
    }
}

export default Settings;