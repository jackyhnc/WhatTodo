import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjRY4RGUqJ4MISkJNtBzWr7dxnFjCAiXE",
  authDomain: "whattodo-d717b.firebaseapp.com",
  projectId: "whattodo-d717b",
  storageBucket: "whattodo-d717b.appspot.com",
  messagingSenderId: "508601287216",
  appId: "1:508601287216:web:d360b80c18bb98630a23f5",
  measurementId: "G-EMVVJ560MB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app