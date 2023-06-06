import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import {getFirestore,updateDoc,doc,getDoc} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";


//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApd9ADhAD0IOBk4eZlL5ogF7CvOCLOh5Y",
  authDomain: "projetbe-512f9.firebaseapp.com",
  projectId: "projetbe-512f9",
  storageBucket: "projetbe-512f9.appspot.com",
  messagingSenderId: "871678987439",
  appId: "1:871678987439:web:10e906ccb15a716e32185a"
};


export default function firebaseConfigClient()
{
    //Initialisation de firebase
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const db = getFirestore(app)
    
    return {app,auth,db}
}



function xpNeeded(niveau)
{
    return (Math.round(Math.pow(niveau, 1.5)*1000));
}

//Push xp dans la db
export async function pushXp(xp)
{
    //On recupere l'utilisateur connecté
    const {auth,db} = firebaseConfigClient()
    const user = auth.currentUser;
    //On récupère le document de l'utilisateur
    const docRef = doc(db, "users", user.uid);
    //On récupère les data de l'utilisateur
    const docSnap = await getDoc(docRef);
    //Si l'utilisateur existe
    if (docSnap.exists()) {
       //On récupère (xp et niveau) les data de l'utilisateur
        const data = docSnap.data();
        let niveau = data.userXp.level;
        let xpTotal = data.userXp.xp + xp;
        let xpObjectif = xpNeeded(niveau);
        console.log(data,xpTotal , xpObjectif , niveau);
        //Si l'utilisateur a atteint le niveau suivant
        if(xpTotal < xpObjectif){
            //On update le document de l'utilisateur
            console.log(xpTotal , xpObjectif , niveau);
            updateDoc(docRef, {
                userXp : {
                    level : niveau,
                    xp : xpTotal
                }
            });
        }
        else{
            while(xpTotal >= xpObjectif){
              //On change les valeurs
              xpTotal = Math.round(xpTotal - xpObjectif);
              niveau = niveau + 1;
              xpObjectif = xpNeeded(niveau);
              //TEST
              console.log(xpTotal , xpObjectif , niveau);
              //On update le document de l'utilisateur
              updateDoc(docRef, {
                userXp : {
                    level : niveau,
                    xp : xpTotal
                }
              });

            }
        }
        
    }
}