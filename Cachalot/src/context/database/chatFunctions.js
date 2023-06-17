import { collection, doc, addDoc, getDocs, getDoc, onSnapshot, query, orderBy, setDoc } from "firebase/firestore";
import firebaseConfigClient from "../../services/firebase.config.js";

const { auth, db } = firebaseConfigClient();

export const chat = {

  sendMessage: async (room, message) => {
    let result = false;
    //On recupere l'utilisateur connecté
    const user = auth.currentUser;
    //On recupere le username de l'utilisateur
    const docRef = doc(db, "users", user.uid);
    await getDoc(docRef).then(async (doc) => {
      //On prend la date 
      const date = new Date();
      const hour = date.toLocaleDateString() + " | " + date.toLocaleTimeString();
      //On ajoute les info dans un objet
      const data = {
        message: message,
        id: user.uid,
        date: hour,
      }
      //On ajoute le message dans la collection messages
      await addDoc(collection(db, room), data).then(() => {
        //On vide le champ de message
        result = true;
      })

    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
    return result;
  },

  getMessage: (room, callback) => {
    const messagesCollection = collection(db, room);
    const messageQuery = query(messagesCollection, orderBy("date", "asc"));
    const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          const docUser = doc(db, "users", change.doc.data().id);
          const userData = await getDoc(docUser);
          
          const data = {
            id: change.doc.id,
            message: change.doc.data().message,
            date: change.doc.data().date,
            displayName: userData.data().displayName,
            photo: userData.data().photo,
            username: userData.data().username,
            me: change.doc.data().id === auth.currentUser.uid,
          };
          callback(data); // Appelle la fonction de rappel avec le nouveau message
        }
      });
    });
    return unsubscribe; // Retourne la fonction de désinscription pour arrêter l'écoute des changements
  },

}



