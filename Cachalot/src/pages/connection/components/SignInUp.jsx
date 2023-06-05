import React, {useEffect, useRef, useState} from "react";
import { useMediaQuery } from "react-responsive";

// Styled components
import { FaExclamationCircle } from "react-icons/fa";
import {
    Container,
    LineWrapper, SignInUpButtonContainer,
    SignInUpContainer,
} from "../../profile/styles/SignInUpPageStyle.js";

// SubComponents
import SignUpFields from "../../profile/components/subComponents/fields/SignUpFields.jsx";
import SignInFields from "../../profile/components/subComponents/fields/SignInFields.jsx";
import SwitchButton from "../../profile/components/subComponents/buttons/SwitchButton.jsx";
import SignInUpGoogleButton from "../../profile/components/subComponents/buttons/SignInUpGoogleButton.jsx";

// JS
import {
    firebaseRegister,
    firebaseLogin,
} from "../../profile/functions/signInUp.js";

const SignInUp = () => {
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
    }, [signInOverlay]);

    function handleState(data) { setErrorData(data); }

    return (
        <Container>
            <SignInUpContainer>
                {signInOverlay ? <h1>Connexion</h1> : <h1>Créer un compte</h1>}
                {errorData.showOverlay ? <div className="error"><FaExclamationCircle/> {errorData.code}</div> : null}
                {signInOverlay ? <SignInFields ref={signInFieldRef} /> : <SignUpFields ref={signUpFieldRef} />}
                <SignInUpButtonContainer width="inherit">
                    <button onClick={async (e) => {
                        e.target.textContent = "...";
                        if (signInFieldRef.current !== null) {
                            let result = await firebaseLogin(signInFieldRef.current.getState());
                            if(result.code !== undefined) {
                                e.target.textContent = "Se connecter";
                                setErrorData(result)
                            }
                        } else if (signUpFieldRef.current !== null) {
                            let result = await firebaseRegister(signUpFieldRef.current.getState());
                            if(result.code !== undefined) {
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
            </SignInUpContainer>
        </Container>
    )
}

export default SignInUp;