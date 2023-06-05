import { GoogleButtonContainer } from "../../styles/SignInUpPageStyle.js";
import {firebaseGoogleLogin} from "../../functions/signInUp.js";
import {FcGoogle} from "react-icons/fc";
import React from "react";

const SignInUpGoogleButton = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <GoogleButtonContainer width="50%">
            {isLoading ?
                <button>
                    <FcGoogle/>
                    Attente d'autorisation...
                </button>

            :
                <button onClick={async (e) => {
                    setIsLoading(true);
                    let result = await firebaseGoogleLogin();
                    if (!result) e.target.textContent = "ERREUR";
                }}>
                    <FcGoogle/>
                    Google
                </button>
            }

        </GoogleButtonContainer>
    )
}

export default SignInUpGoogleButton;