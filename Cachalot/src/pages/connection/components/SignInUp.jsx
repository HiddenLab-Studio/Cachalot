import React, {useEffect, useRef, useState} from "react";
import { useMediaQuery } from "react-responsive";

// Context
import { useCache } from "../../../context/manager/cache/FriendsCacheManager.js";

// Styled components
import { FaExclamationCircle } from "react-icons/fa";
import {
    Content,
    LineWrapper,
    SignInUpButtonContainer,
    SignInUpContainer
} from "../styles/SignInUpPageStyle.js";

// SubComponents
import SignUpFields from "./subComponents/fields/SignUpFields.jsx";
import SignInFields from "./subComponents/fields/SignInFields.jsx";
import SwitchButton from "./subComponents/buttons/SwitchButton.jsx";
import SignInUpGoogleButton from "./subComponents/buttons/SignInUpGoogleButton.jsx";

// JS
import {
    firebaseRegister,
    firebaseLogin,
} from "../functions/signInUp.js";

const SignInUp = () => {
    // Context
    const cacheManager = useCache();
    // Media queries
    const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });
    // State
    const [signInOverlay, setSignInOverlay] = useState(true);
    const [errorData, setErrorData] = useState({
        showOverlay: false,
        code: ""
    });

    // Refs
    const signInFieldRef = useRef(null);
    const signUpFieldRef = useRef(null);

    // useEffect
    useEffect(() => {
        setErrorData({
            showOverlay: false,
            code: ""
        });
        cacheManager.clearFriendsCache();
        console.log(cacheManager.getFriendsCache());
    }, [signInOverlay]);

    function handleState(data) { setErrorData(data); }

    return (
        <SignInUpContainer>
            <Content>
                {signInOverlay ? <h1>Connexion</h1> : <h1>Créer un compte</h1>}
                {errorData.showOverlay ? <div className="error"><FaExclamationCircle/> {errorData.code}</div> : null}
                {signInOverlay ? <SignInFields ref={signInFieldRef}/> : <SignUpFields ref={signUpFieldRef}/>}
                <SignInUpButtonContainer width="inherit">
                    <button onClick={async (e) => {
                        e.target.textContent = "...";
                        if (signInFieldRef.current !== null) {
                            let result = await firebaseLogin(signInFieldRef.current.getState());
                            if (result.code !== undefined) {
                                e.target.textContent = "Se connecter";
                                setErrorData(result)
                            }
                        } else if (signUpFieldRef.current !== null) {
                            let result = await firebaseRegister(signUpFieldRef.current.getState());
                            if (result.code !== undefined) {
                                e.target.textContent = "S'inscrire";
                                setErrorData(result)
                            }
                        }
                    }}>
                        {signInOverlay ? "Se connecter" : "S'inscrire"}
                    </button>
                </SignInUpButtonContainer>
                <LineWrapper>
                    <div className="line"></div>
                    <div className="where">ou</div>
                    <div className="line"></div>
                </LineWrapper>
                <SignInUpGoogleButton width="inherit" setState={handleState}/>
                <SwitchButton state={signInOverlay} setState={setSignInOverlay}>
                    {signInOverlay ? "S'inscrire" : "Connexion"}
                </SwitchButton>
            </Content>
        </SignInUpContainer>
    )
}

export default SignInUp;