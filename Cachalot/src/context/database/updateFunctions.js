import firebaseConfigClient from "../../services/firebase.config.js";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";

const { auth, db, storage } = firebaseConfigClient();

function getAllUser(list, type, name, photo, id) {
    list.forEach(async (element) => {
        const allUser = collection(db, "users");
        const allUserDoc = await getDocs(allUser);
        const allUserList = allUserDoc.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
        });
        for (const userTest of allUserList) {
            if (userTest.username === element.username) {
                const elementRef = doc(db, "users", userTest.id + '/' + type + '/' + id);
                await updateDoc(elementRef, {
                    displayName: name,
                    photo : photo,
                })
            }
        }
    });
}
export const update = {
    uploadImage: async (name, image, dossier) => {
        // Obtenir l'objet blob à partir de l'URL blob
        const response = await fetch(image);
        const blob = await response.blob();

        //On créé le lien dans storage
        const storageRef = ref(storage, dossier + "/" + name);
        //On upload le blob dans le lien
        await uploadBytes(storageRef, blob);

        //On récupére l'URL de l'image
        return await getDownloadURL(storageRef);
    },

    updateNameForFollowing: async (name, photo, id) => {
        const userFollowingColl = collection(db, "users/" + id + "/following");
        const userFollowingDoc = await getDocs(userFollowingColl);
        const userFollowing = userFollowingDoc.docs.map(doc => doc.data());
        if (userFollowing.length !== 0) {
            getAllUser(userFollowing, "follower", name, photo, id);
        }
    },

    updateNameForFollower: async (name, photo, id) => {
        const userFollowerColl = collection(db, "users/" + id + "/follower");
        const userFollowerDoc = await getDocs(userFollowerColl);
        const userFollower = userFollowerDoc.docs.map(doc => doc.data());
        if (userFollower.length !== 0) {
            getAllUser(userFollower, "following", name, photo, id);
        }
    },

    updateUserData: async (data) => {
        let result = false;
        const user = auth.currentUser;
        const userDocRef = doc(db, "users", user.uid);
        const userInfo = await getDoc(userDocRef).then((doc) => {
            if (doc.exists()) {
                return doc.data();
            }})
        console.log(userInfo.photo);
        const newUserData = {};

        if (data.photo !== "") {
            const urlImage = await update.uploadImage(user.uid, data.photo, "users");
            newUserData.photo = urlImage;
            if(data.displayName !== ""){
                await update.updateNameForFollower(data.displayName, urlImage, user.uid);
                await update.updateNameForFollowing(data.displayName, urlImage, user.uid);
                newUserData.displayName = data.displayName;
            }
            else{
                await update.updateNameForFollower(userInfo.displayName, urlImage, user.uid);
                await update.updateNameForFollowing(userInfo.displayName, urlImage, user.uid);
            }

        }else if (data.displayName !== "") {
            await update.updateNameForFollower(data.displayName, userInfo.photo, user.uid);
            await update.updateNameForFollowing(data.displayName, userInfo.photo, user.uid);
            newUserData.displayName = data.displayName;
        }

        if (data.age !== "") {
            newUserData.age = data.age;
        }

        await updateDoc(userDocRef, newUserData).then(() => {
                result = true;
            }
        ).catch((error) => {
            console.log(error);
        });

        return result;
    }




}