import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8S1sktBPF1QVRxCvZ9Oj-SKWXhI5ZRXM",
  authDomain: "netflix-redux-186f3.firebaseapp.com",
  projectId: "netflix-redux-186f3",
  storageBucket: "netflix-redux-186f3.appspot.com",
  messagingSenderId: "931693794919",
  appId: "1:931693794919:web:75731362df544a55c3e6c2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
