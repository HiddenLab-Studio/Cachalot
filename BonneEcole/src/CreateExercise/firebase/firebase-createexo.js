import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, deleteDoc, addDoc, getDoc, onSnapshot, query, orderBy, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";
import firebaseConfigClient from "./firebaseConfigClient.js";



//Firebase configuration
const { auth, db, storage } = firebaseConfigClient();

//Fonction pour upload une image
async function uploadImage(name, image) {
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

    

    const docRef = doc(db, "exercises", exercise.name);
    await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            console.log(name + " already exists");
            return;
        } else {
            
            const urlImage = uploadImage(exercise.name, exercise.image);
            const data = {
                statement: exercise.statement,
                answers: exercise.answers,
                image: urlImage,
            }
            const docData = setDoc(docRef, data);
            return docData;
        }
    }).catch((error) => {//Si il y a une erreur
    });

}

export async function createQCM() {

}
