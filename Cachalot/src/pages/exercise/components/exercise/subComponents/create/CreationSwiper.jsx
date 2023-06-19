import {mathFunctions} from "../../../../functions/MathExerciseGenerator.js";

const CreationSwiper = () => {


    async function test() {
        let exercices = await mathFunctions.getExercises(10);
        console.log(exercices);
    }

    test();


    return (
        <div>
            <h1>SALUT</h1>
        </div>
    )
}

export default CreationSwiper;