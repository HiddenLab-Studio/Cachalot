import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, deleteDoc, addDoc, getDoc, onSnapshot, query, orderBy, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";
import firebaseConfigClient from "./firebaseConfigClient.js";

//Firebase configuration
const { auth, db, storage } = firebaseConfigClient();


//Fonction pour upload une image
export async function uploadImage(name, image) {
    console.log(name);
    // Obtenir l'objet blob à partir de l'URL blob
    const response = await fetch(image);
    const blob = await response.blob();

    //On créé le lien dans storage
    const storageRef = ref(storage, "exercise_images/" + name);
    //On upload le blob dans le lien
    await uploadBytes(storageRef, blob);

    //On récupére l'URL de l'image
    const urlImage = await getDownloadURL(storageRef);
    return urlImage;
}



//function to create an exercise
export async function createExercise(exercise) {

    //Il faut get l'user pour l'admin
    //const user = auth.currentUser;

    const docRef = collection(db, "exercises")

    let urlImage = undefined;
    if (exercise.imageURL != undefined){
        console.log(exercise.imageLink);
        urlImage = await uploadImage(exercise.imageLink, exercise.imageURL)
    }

    const data = generateDataFromExerciseType(exercise,urlImage);
    const docData = addDoc(docRef, data);
    console.log("Exercise sent to firebase");
    return docData;
}


function generateDataFromExerciseType(exercise, urlImage) {
    if (exercise.type == "INPUT") {
        const data = {
            type: exercise.type,
            title: exercise.title,
            answer: exercise.answer,
            question: exercise.question,
        }


        if(urlImage != undefined){
            data.imageLink = urlImage;
            console.log("image link : " + urlImage);
        }

        return data;
    }
    else if (exercise.type == "QCM") {

        const data = {
            type: exercise.type,
            title: exercise.title,
            question: exercise.question,
            answerQCMArray: exercise.answerQCMArray,
            QCMCorrectAnswer: exercise.QCMCorrectAnswer
        }

        if(urlImage != undefined){
            data.imageLink = urlImage;
            console.log("image link : " + urlImage);
        }

        return data;
    }
}
