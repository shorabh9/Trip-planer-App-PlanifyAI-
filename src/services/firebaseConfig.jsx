
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBbRpA0r0F0CcH3RSUJKR0dni6FWqU2N6Y",
  authDomain: "planifyai-data.firebaseapp.com",
  projectId: "planifyai-data",
  storageBucket: "planifyai-data.firebasestorage.app",
  messagingSenderId: "963316160743",
  appId: "1:963316160743:web:52cacf0c9e23796712aa42",
  measurementId: "G-J3710457KR"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);