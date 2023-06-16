import React from "react";
import {data, mathFunctions} from "../../../functions/MathExerciseGenerator.js";

const SelectorClass = ({setState}) => {
    return (
        <>
            {data.validClassType.map(type => {
                return (
                    <button id={type === "all" ? "all_class" : type} key={type} onClick={(event) => {
                        mathFunctions.selectClassType(type).then(() => {
                            mathFunctions.updateView(event);
                            console.log(data.currentExercise);
                            setState("exercise", data.currentExercise);
                        });
                    }}>
                        {type === "all" ? "Tout" : type}
                    </button>
                )
            })}
        </>
    )
}

export default SelectorClass;