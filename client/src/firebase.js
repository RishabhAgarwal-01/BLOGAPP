// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "blog-app-cf1b5.firebaseapp.com",
  projectId: "blog-app-cf1b5",
  storageBucket: "blog-app-cf1b5.appspot.com",
  messagingSenderId: "435501402668",
  appId: "1:435501402668:web:c85073842e8f5d810f1f89"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);