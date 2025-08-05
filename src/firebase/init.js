// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDOhIanWN8ziS9y2xGrL0-ZRtxhALR_7fw",
  authDomain: "fit5032-lab7-5676b.firebaseapp.com",
  projectId: "fit5032-lab7-5676b",
  storageBucket: "fit5032-lab7-5676b.firebasestorage.app",
  messagingSenderId: "705717394327",
  appId: "1:705717394327:web:f1c8327d82b787a81602d2"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
