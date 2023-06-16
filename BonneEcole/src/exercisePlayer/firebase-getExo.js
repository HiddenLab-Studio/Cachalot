import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, deleteDoc, addDoc, getDoc, onSnapshot, query, orderBy, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";
import firebaseConfigClient from "./firebaseConfigClient.js";

const { auth, db, storage } = firebaseConfigClient();

export async function getExercise(id) {
    const docRef = doc(db, "exercises", id);
    const exo = await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            console.log("Document data:", doc.data());
            let exerciseObject = removeAnswersFromExercise(doc.data());
            return exerciseObject;
        } else {
            return null;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    return exo;
}


export async function getSolution(id){
    const docRef = doc(db, "exercises", id);
    const exo = await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            console.log("Document data:", doc.data());
            let solution = getSolutionFromExercise(doc.data());
            
            return solution;
        } else {
            return null;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    return exo;
}


function removeAnswersFromExercise(docdata){
    let exerciseObject = docdata;
    if(exerciseObject.type == "INPUT"){
        exerciseObject.answer = undefined;
    }
    else if(exerciseObject.type == "QCM"){
        exerciseObject.QCMCorrectAnswer = undefined;
    }

    return exerciseObject;
}

function getSolutionFromExercise(docdata){
    let exerciseObject = docdata;
    if(exerciseObject.type == "INPUT"){
        return exerciseObject.answer;
    }
    else if(exerciseObject.type == "QCM"){
        return exerciseObject.QCMCorrectAnswer;
    }
}