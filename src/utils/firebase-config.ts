import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCrsaoX7viMM0KmUqy_7pQTpKPSUfxMvso",
    authDomain: "react-native-firebase-7800b.firebaseapp.com",
    projectId: "react-native-firebase-7800b",
    storageBucket: "react-native-firebase-7800b.appspot.com",
    messagingSenderId: "529097980534",
    appId: "1:529097980534:web:a050455b85cc7b84413d57",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
