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

const Settings = () => {
    // Context
    const auth = useAuth();
    const userData = auth.userData;

    // State
    const [isLoading, setIsLoading] = useState(true);
    const [onChanges, setOnChanges] = useState(false);

    useEffect(() => {
        if(auth.currentUser instanceof Object || typeof auth.currentUser === "number") setIsLoading(false);
    }, [auth.currentUser])

    if(isLoading) {
        return <Loading />
    } else if(auth.currentUser instanceof Object) {
        return (
            <MainContainer>
                <Navbar />
                <SettingsContainer>
                    <Content>
                        <h1>Paramètres</h1>
                        <table className="TableContainer">
                            <tbody>
                            <tr>
                                <td>
                                    <h2>Photo de profil</h2>
                                </td>
                                <td>
                                    <input type="file" accept="image/*"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h2>Nom d'utilisateur</h2>
                                </td>
                                <td>
                                    <input type="text" placeholder={userData.username}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h2>Email</h2>
                                </td>
                                <td>
                                    <input type="text" placeholder={userData.email}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <ApplyChangesButtonContainer change={onChanges}>
                            <button>Enregistrer les modifications</button>
                        </ApplyChangesButtonContainer>
                    </Content>
                </SettingsContainer>
            </MainContainer>
        )
    } else if(typeof auth.currentUser === "number") {
        window.location.pathname = "/profile";
    }

}

export default Settings;