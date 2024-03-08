// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "weconnect-blog.firebaseapp.com",
  projectId: "weconnect-blog",
  storageBucket: "weconnect-blog.appspot.com",
  messagingSenderId: "880792222059",
  appId: "1:880792222059:web:84a42595809ade0f59b42e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 