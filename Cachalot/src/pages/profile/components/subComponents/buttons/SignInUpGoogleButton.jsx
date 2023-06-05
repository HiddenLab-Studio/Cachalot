import { GoogleButtonContainer } from "../../../styles/SignInUpPageStyle.js";
import {firebaseGoogleLogin} from "../../../functions/signInUp.js";
import {FcGoogle} from "react-icons/fc";
import React from "react";
import {useAuth} from "../../../../../context/AuthContext.js";

const SignInUpGoogleButton = ({ setState }) => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);

    async function loginByGoogle() {
        setIsLoading(true);
        auth.setIsLoading(true);
        let result = await firebaseGoogleLogin();

        setIsLoading(false);
        auth.setIsLoading(false);

        if (result.code !== undefined) {
            setState(result);
        }
    }

    if (isLoading) {
        return (
            <GoogleButtonContainer width="50%">
                <button>
                    <FcGoogle/>
                    Attente d'autorisation...
                </button>
            </GoogleButtonContainer>
        )
    } else {
        return (
            <GoogleButtonContainer width="50%">
                <button onClick={async () => loginByGoogle()}>
                    <FcGoogle/>
                    Google
                </button>
            </GoogleButtonContainer>
        )
    }
}

export default SignInUpGoogleButton;