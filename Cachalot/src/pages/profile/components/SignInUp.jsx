import React, { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useMediaQuery } from "react-responsive";

// Styled components
import {
    Container,
    LineWrapper,
    SignInUpButton,
    SignInUpContainer,
    SignInUpGoogleButton,
} from "../styles/SignInUpPageStyle.js";

// SubComponents
import SignUpFields from "./subComponents/SignUpFields.jsx";
import SignInFields from "./subComponents/SignInFields.jsx";
import SwitchButton from "./subComponents/SwitchButton.jsx";

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
                    <button onClick={() => {
                        if(signInFieldRef.current !== null) console.log(signInFieldRef.current.getState());
                        if(signUpFieldRef.current !== null) console.log(signUpFieldRef.current.getState());
                    }}>
                        Se connecter
                    </button>
                </SignInUpButton>
                <LineWrapper>
                    <div className="line"></div>
                    <div className="where">ou</div>
                    <div className="line"></div>
                </LineWrapper>
                <SignInUpGoogleButton width="50%">
                    <button>
                        <FcGoogle/>
                        Google
                    </button>
                </SignInUpGoogleButton>
                    <SwitchButton state={signInOverlay} setState={setSignInOverlay}>
                        {signInOverlay ? "S'inscrire" : "Connexion"}
                    </SwitchButton>
            </SignInUpContainer>
        </Container>
    )
}

export default SignInUp;