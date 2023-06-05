import React from "react";
import {data, mathFunctions} from "../functions/MathExerciseGenerator.js";

const classPermission = [
    {
        class: ["CM1", "CM2", "all"],
        permission: ["addition", "soustraction", "multiplication", "division", "all"]
    },
    {
        class: ["CP"],
        permission: ["addition"]
    },
    {
        class: ["CE1", "CE2"],
        permission: ["addition", "soustraction", "multiplication", "all"]
    },
]

const SelectorType = ({setState, exerciseType}) => {
    let classPermision = classPermission.find(element => element.class.includes(data.currentLevel)).permission;
    console.log(classPermision);

    if(!classPermision.includes(exerciseType)) {
        console.info("exerciseType not found");
        setState("exerciseType", classPermision[0]);
        document.getElementById("addition").style.backgroundColor = "grey";
    }

    return (
        <>
            {data.validExerciseType.map(type => {
                if(classPermision.includes(type)){
                    return (
                        <button id={type === "all" ? "all_exercise" : type} key={type} onClick={(event) => {
                            mathFunctions.selectExerciseType(type).then(() => {
                                mathFunctions.updateView(event);
                                setState("exercise", data.currentExercise);
                            });
                        }}>
                            {type === "all" ? "Tout" : type}
                        </button>
                    )
                } else {
                    return null;
                }
            })}
        </>
    )
}

export default SelectorType;