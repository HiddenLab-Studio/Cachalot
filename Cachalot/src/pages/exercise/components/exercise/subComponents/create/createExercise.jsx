import React, {useEffect} from "react";

const createExercise = (props) => {
    const auth = props.auth;

    useEffect( () => {
        console.info("Rendering createExercise.jsx...")
    }, []);

    return (
        <div>
            <h1>createExercise</h1>
        </div>
    )
}

export default createExercise;