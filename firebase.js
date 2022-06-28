// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf79teEWcFtahGqfIpVTTceKHOrd9Lw2g",
  authDomain: "twitter-clone-edi.firebaseapp.com",
  projectId: "twitter-clone-edi",
  storageBucket: "twitter-clone-edi.appspot.com",
  messagingSenderId: "38230425307",
  appId: "1:38230425307:web:78fd5bce0b55c98d4a16fe"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export default app
export { db, storage }