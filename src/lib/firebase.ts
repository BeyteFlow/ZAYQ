import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeWI2D-Dk9X55w6is0eBoYZRSNPLyXHY4",
  authDomain: "zayq-1b3ee.firebaseapp.com",
  projectId: "zayq-1b3ee",
  storageBucket: "zayq-1b3ee.firebasestorage.app",
  messagingSenderId: "982781196414",
  appId: "1:982781196414:web:69841f4c02c35d8cc5c02f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
