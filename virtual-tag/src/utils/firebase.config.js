import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "virtual-tag-6eb92.firebaseapp.com",
  databaseURL: "https://virtual-tag-6eb92-default-rtdb.firebaseio.com",
  projectId: "virtual-tag-6eb92",
  storageBucket: "virtual-tag-6eb92.appspot.com",
  messagingSenderId: "268850849904",
  appId: "1:268850849904:web:3f281c24b45ba31a056cb5"
});

export const db = app.firestore();
export const auth = app.auth();
export const storage = app.storage();
export default app;