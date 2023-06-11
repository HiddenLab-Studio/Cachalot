import React, {forwardRef, useImperativeHandle, useState} from "react";
import {FieldContainer, InputWithForgotPassword} from "../../../styles/SignInUpPageStyle.js";
import {Link} from "react-router-dom";

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
                <Link to="/forgot-password">OUBLIÉ ?</Link>
            </InputWithForgotPassword>
        </FieldContainer>
    )
});

export default SignInFields;
