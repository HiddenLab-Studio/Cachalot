import React, {createRef, forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {FieldContainer, InputWithRevealPassword} from "../../../styles/SignInUpPageStyle.js";

const SignUpFields = forwardRef( (props, ref) => {
    // States
    const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");

    // Ref
    const passwordInput = createRef();

    useImperativeHandle(ref, () => ({
        getState: () => {
            return {
                username: username,
                age: age,
                email: email,
                password: password
            };
        },
    }));

    useEffect(() => {
        if (isPasswordRevealed) passwordInput.current.type = "text";
        else passwordInput.current.type = "password";
    }, [isPasswordRevealed]);

    return (
        <FieldContainer ref={ref}>
            <input placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)}/>
            <input placeholder="Âge (facultatif)" onChange={(e) => setAge(e.target.value)}/>
            <input placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
            <InputWithRevealPassword>
                <input ref={passwordInput} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={() => setIsPasswordRevealed(!isPasswordRevealed)}>AFFICHER</button>
            </InputWithRevealPassword>
        </FieldContainer>
    )
});

export default SignUpFields;