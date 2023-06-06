import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, deleteDoc, addDoc, getDoc, onSnapshot, query, orderBy, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { ref,uploadBytes,getDownloadURL} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";
import firebaseConfigClient from "./firebaseConfigClient.js";



//Firebase configuration
const { auth, db,storage } = firebaseConfigClient();

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
    
    const urlImage = await uploadImage(exercise.name, exercise.image);

    const docRef = collection(db, "exercises");
    const data = {
        name: exercise.name,
        statement: exercise.statement,
        answers: exercise.answers,
        image: urlImage,

    }
    const docData = await addDoc(docRef, data);
    return docData;
}

export async function createQCM() {

}
