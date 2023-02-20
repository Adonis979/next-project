import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBU4g-IJuN_9C9sVQtwaeDAr1Gc7P_pATc",
  authDomain: "shop-app-861ca.firebaseapp.com",
  projectId: "shop-app-861ca",
  storageBucket: "shop-app-861ca.appspot.com",
  messagingSenderId: "445528271734",
  appId: "1:445528271734:web:321e8127282478981d2857",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
