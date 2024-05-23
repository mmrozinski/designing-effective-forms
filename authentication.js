import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtZzzXpN8mvPdWjQDb80s5kbTWRktIJPM",
    authDomain: "tpf-pk-bb4f1.firebaseapp.com",
    projectId: "tpf-pk-bb4f1",
    storageBucket: "tpf-pk-bb4f1.appspot.com",
    messagingSenderId: "432544464572",
    appId: "1:432544464572:web:17a2d6758c6a8d2aec1ab9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const emailInput = document.querySelector("#exampleInputEmail1");

const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + " " + errorMessage);
    })
}

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + " " + errorMessage);
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        console.log(user);

        firstNameInput.value = user.displayName.split(" ")[0];
        lastNameInput.value = user.displayName.split(" ")[1];
        emailInput.value = user.email;
    }
})

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);