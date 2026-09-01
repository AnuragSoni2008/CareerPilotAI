
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "aiinterview-c94b7.firebaseapp.com",
  projectId: "aiinterview-c94b7",
  storageBucket: "aiinterview-c94b7.firebasestorage.app",
  messagingSenderId: "611045401306",
  appId: "1:611045401306:web:663e8ed72d9dcb0cdb7be3"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}