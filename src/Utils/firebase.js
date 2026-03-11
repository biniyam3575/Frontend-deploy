import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for Authentication
import { getFirestore } from "firebase/firestore"; // Import getFirestore for Cloud Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDD4hXwPJxUTmV1JK6ggZJCXzEWMNtFCIM",
  authDomain: "clone-95a31.firebaseapp.com",
  projectId: "clone-95a31",
  storageBucket: "clone-95a31.firebasestorage.app",
  messagingSenderId: "315963886878",
  appId: "1:315963886878:web:8c1fa820df134f61f00d0f"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

