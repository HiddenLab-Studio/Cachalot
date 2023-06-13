import { collection, doc, addDoc, getDocs, getDoc, onSnapshot, query, orderBy, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../../composable/firebaseConfigClient.js";

const { auth, db } = firebaseConfigClient();

window.createGame = async function (e) {
    e.preventDefault();
    let game = {
        nbrManche : document.getElementById("nbrManche").value,
        nbrJoueur : document.getElementById("nbrJoueur").value,
        discipline : document.getElementById("discipline").value,
    }
    await createGame(game);
};


//function createGame
async function createGame(game) {
    const user = auth.currentUser;
    const classeRef = doc(db, "classes", window.location.pathname.split('/')[1] );
    await getDoc(classeRef).then((docSnap) => {
        if(docSnap.data().admin.id == user.uid){
            const gameRef = doc(db, "classes", window.location.pathname.split('/')[1] , "games", game.discipline);
            setDoc(gameRef, game);
            console.log("Game created");
        }
        else{
            return;
        }
    });
}


async function gameState(classe){
    const docRef = collection(db, "classes/"+ classe + "/games");
    const docSnap = await getDocs(docRef);
    if(! docSnap.empty){
        console.log("Join game");
        return docSnap.data();
    }
}


gameState(window.location.pathname.split('/')[1])