import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, deleteDoc, addDoc, getDoc, onSnapshot, query, orderBy, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";
import firebaseConfigClient from "./firebaseConfigClient.js";

const { auth, db, storage } = firebaseConfigClient();

export async function getExo(exoName) {
    const docRef = doc(db, "exercises", exoName);
    const exo = await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            console.log("Document data:", doc.data());
            return doc.data();
        } else {
            return null;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    return exo;
}