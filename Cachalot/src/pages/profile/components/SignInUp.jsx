import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import { FcGoogle } from "react-icons/fc";
import { useMediaQuery } from "react-responsive";

// Styled components
import {
    Container,
    LineWrapper,
    SignInUpButton,
    SignInUpContainer,
} from "../styles/SignInUpPageStyle.js";

// SubComponents
import SignUpFields from "./subComponents/SignUpFields.jsx";
import SignInFields from "./subComponents/SignInFields.jsx";
import SwitchButton from "./subComponents/SwitchButton.jsx";
import SignInUpGoogleButton from "./subComponents/SignInUpGoogleButton.jsx";

// JS
import { firebaseRegister, firebaseLogin, firebaseGoogleLogin } from "../functions/signInUp.js";

const SignInUp = () => {
    const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });

    // State
    const [signInOverlay, setSignInOverlay] = useState(true);

    // Refs
    const signInFieldRef = useRef(null);
    const signUpFieldRef = useRef(null);

    return (
        <Container>
            <SignInUpContainer>
                {signInOverlay ? <h1>Connexion</h1> : <h1>Créer un compte</h1>}
                {signInOverlay ? <SignInFields ref={signInFieldRef} /> : <SignUpFields ref={signUpFieldRef} />}
                <SignInUpButton width="inherit">
                    <button onClick={async (e) => {
                        if (signInFieldRef.current !== null) {
                            console.log(signInFieldRef.current.getState())
                            e.target.textContent = "Connexion...";
                            let result = await firebaseLogin(signInFieldRef.current.getState());
                            console.log(result);
                            if(!result) e.target.textContent = "Se connecter";
                        } else if (signUpFieldRef.current !== null) {
                            console.log(signUpFieldRef.current.getState());
                            e.target.textContent = "Création...";
                            let result = await firebaseRegister(signUpFieldRef.current.getState());
                            if(!result) e.target.textContent = "S'inscrire";

                        }
                    }}>
                        {signInOverlay ? "Se connecter" : "S'inscrire"}
                    </button>
                </SignInUpButton>
                <LineWrapper>
                    <div className="line"></div>
                    <div className="where">ou</div>
                    <div className="line"></div>
                </LineWrapper>
                <SignInUpGoogleButton width="inherit"></SignInUpGoogleButton>
                <SwitchButton state={signInOverlay} setState={setSignInOverlay}>
                    {signInOverlay ? "S'inscrire" : "Connexion"}
                </SwitchButton>
            </SignInUpContainer>
        </Container>
    )
}

export default SignInUp;