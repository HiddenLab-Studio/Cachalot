import {collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc} from "firebase/firestore";
import firebaseConfigClient from "../../services/firebase.config.js";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

const { auth, db, storage } = firebaseConfigClient();


export const exercise = {
    createExercise: async (currentUser, data) => {
        let result = {
            exerciseId: undefined,
            code: false
        };

        // We generate a unique code for the exercise
        const exerciseCode = await exercise.createCode();

        const docRef = doc(db, "exercises" , exerciseCode.toString());
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);
        console.log(userDoc.data().userExercise);

        console.log(data);
        if(data.photo !== undefined) data.photo = await exercise.uploadImage(exerciseCode, data.photo);

        const date = new Date();
        const dateCreation = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

        // We add exercise to the database
        await setDoc(docRef, {
            username: userDoc.data().username,
            title: data.title,
            description: data.desc,
            question: data.question,
            answers: data.answers,
            type: data.type,
            dateCreation: dateCreation,
            like: 0,
        }).then(() => {
            result.exerciseId = exerciseCode;
            result.code = true;
        });

        await updateDoc(userRef, {
            userExercise : {
                ...userDoc.data().userExercise,
                myExerciseList : [...userDoc.data().userExercise.myExerciseList, exerciseCode]
            }
        })

        return result;
    },


    uploadImage: async (exerciseId, image) => {
        console.log(exerciseId);
        // Obtenir l'objet blob à partir de l'URL blob
        const response = await fetch(image);
        const blob = await response.blob();

        //On créé le lien dans storage
        const storageRef = ref(storage, "exercise_images/" + exerciseId);
        //On upload le blob dans le lien
        await uploadBytes(storageRef, blob);

        //On récupére l'URL de l'image
        return await getDownloadURL(storageRef);
    },

    createCode : async () => {
        // generate a code and check if it already exists
        const exerciseCode = Math.floor(1000 + Math.random() * 9000);
        const docRef = doc(db, "exercises", exerciseCode.toString());
        const document = await getDoc(docRef);
        if (document.exists()) {
            console.log("Code already exists");
            await exercise.createCode();
        } else {
            console.log("Code is free");
            return exerciseCode;
        }
    },


    getExerciseByLike: async (amount) => {
        const exerciseRef = collection(db, "exercises");
        const exerciseQuery = query(exerciseRef, orderBy("like", "desc"), limit(amount));
        const exerciseSnapshot = await getDocs(exerciseQuery);
        const exerciseList = [];
        exerciseSnapshot.forEach((doc) => {
            exerciseList.push({id : doc.id, ...doc.data()});
        });
        return exerciseList;
    },

    async getExerciseById(id) {
        // We retrieve the exercise photo from the storage
        const storageRef = ref(storage, "exercise_images/" + id);
        // We download the photo from the storage we handle not found from the storage
        const photo = await getDownloadURL(storageRef).catch((error) => {
            switch (error.code) {
                case 'storage/object-not-found':
                    return undefined;
                default:
                    console.log(error.code);
            }
        });
        // We retrieve the exercise from the database
        const exerciseRef = await doc(db, "exercises", id.toString());
        // We add the photo to the exercise
        return await getDoc(exerciseRef).then((doc) => {
            if (doc.exists()) {
                return {...doc.data(), photo: photo};
            } else {
                console.log("No such document!");
            }
        });
    },



}