import React, {forwardRef, useImperativeHandle, useState} from "react";
import {FieldContainer, InputWithForgotPassword} from "../../styles/SignInUpPageStyle.js";

const SignInFields = forwardRef((props, ref) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useImperativeHandle(ref, () => ({
        getState: () => {
            return {
                username: undefined,
                age: undefined,
                email: email,
                password: password
            };
        },
    }));

    return (
        <FieldContainer ref={ref}>
            <input placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
            <InputWithForgotPassword>
                <input placeholder="Mot de passe" type="password" onChange={(e) => setPassword( e.target.value)} />
                <a href="/forgot_password">OUBLIÉ ?</a>
            </InputWithForgotPassword>
        </FieldContainer>
    )
});

export default SignInFields;
