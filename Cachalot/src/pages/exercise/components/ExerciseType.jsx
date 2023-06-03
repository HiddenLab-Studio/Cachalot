import React from "react";
import {data, mathFunctions} from "../functions/MathExerciseGenerator.js";

const classPermission = [
    {
        class: "all",
        permission: ["addition", "soustraction", "multiplication", "division", "all"]
    },
    {
        class: "CP",
        permission: ["addition"]
    },
    {
        class: "CE1",
        permission: ["addition", "soustraction", "multiplication", "all"]
    },
    {
        class: "CE2",
        permission: ["addition", "soustraction", "multiplication", "all"]
    },
    {
        class: "CM1",
        permission: ["addition", "soustraction", "multiplication", "division", "all"]
    },
    {
        class: "CM2",
        permission: ["addition", "soustraction", "multiplication", "division", "all"]
    },
]

const ExerciseType = ({setState, exerciseType}) => {
    let classPermision = classPermission.find(element => element.class === data.currentLevel).permission;
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

export default ExerciseType;