// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi9B715g9ZMcS6APJSvj6GJ4st-u5E15I",
  authDomain: "blogapp-fullstack.firebaseapp.com",
  projectId: "blogapp-fullstack",
  storageBucket: "blogapp-fullstack.appspot.com",
  messagingSenderId: "51781155567",
  appId: "1:51781155567:web:16448c3a9a044a9733f91a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//Google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((error) => {
        console.log(error);
    })

    return user;
}