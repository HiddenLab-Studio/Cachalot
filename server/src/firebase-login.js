//Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import {firebaseConfig } from "./firebase-register.js";


// Your web app's Firebase configuration
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Login system
window.login = function(e){
    e.preventDefault();
    //Recuperation des element html
    let obj = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    console.log(obj);
    //Login
    signInWithEmailAndPassword(auth, obj.username, obj.password)
    .then(function(succes) {
        console.log(succes);
    })
    .catch(function(error) {console.log(error);})
    
};



