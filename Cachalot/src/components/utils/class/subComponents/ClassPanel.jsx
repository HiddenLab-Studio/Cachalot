import React, {useEffect} from 'react';
import tw, { styled } from "twin.macro";

const ClassPanel = ({auth}) => {
    const userData = auth.userData;

    useEffect(() => {
        const getUserClasses = async () => {
            const result = await auth.user.getUserClasses(auth.currentUser);
            console.log(result);
        }

        getUserClasses();

    }, []);


    return (
        <div>
            <h1>ClassPanel</h1>
        </div>
    )
}

export default ClassPanel;