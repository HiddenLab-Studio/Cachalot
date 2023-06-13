// Import des fonctions dont on a besoin
import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { collection, doc, getDocs, getDoc, onSnapshot, query, orderBy, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseConfigClient from "../../composable/firebaseConfigClient.js";
import { pushXp } from "../../composable/firebaseConfigClient.js";


//Firebase configuration
const { auth, db } = firebaseConfigClient();

async function getUserByUsername(username) {
    //recuperer la liste des users
    const usersCol = collection(db, 'users');
    //recuperer la liste des documents
    const usersSnapshot = await getDocs(usersCol);
    //recuperer la liste des données
    const usersList = usersSnapshot.docs.map(doc => {
        const data = doc.data()
        data.id = doc.id
        return data
    });
    //recuperer l'utilisateur
    const user = usersList.find(user => user.username === username);
    
    const userFollowerColl = collection(db, "users/"+user.id+"/follower");
    const userFollowerDoc = await getDocs(userFollowerColl);
    const userFollower = userFollowerDoc.docs.map(doc => doc.data());

    const userFollowingColl = collection(db, "users/"+user.id+"/following");
    const userFollowingDoc = await getDocs(userFollowingColl);
    const userFollowing = userFollowingDoc.docs.map(doc => doc.data());

    return {user, userFollower, userFollowing};

}

export async function userExist(username) {
    let userExist = false;
    const usersCol = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    const user = usersList.find(user => user.username === username);
    if (user != undefined) {
        userExist = true;
    } else {
        userExist = false;
    }

    return userExist;
}

getUserByUsername('lucas')