// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// __________________________________________________________________________________
// const firebaseConfig = {
//   apiKey: "AIzaSyC7OA4Wkqdhy6y0RcCcJ-Jr0TFtebB6qQc",
//   authDomain: "docapp-8e756.firebaseapp.com",
//   projectId: "docapp-8e756",
//   storageBucket: "docapp-8e756.appspot.com",
//   messagingSenderId: "587168200542",
//   appId: "1:587168200542:web:44473bcdbdfca7c43e01cf",
//   measurementId: "G-4D8FM4TFQ5"
// };
// __________________________________________________________________________________



// const firebaseConfig = {
//   apiKey: "AIzaSyAcSOQ4L7y1xhqoZ6NNfqkstyE9M2C9R50",
//   authDomain: "docapp1-95697.firebaseapp.com",
//   projectId: "docapp1-95697",
//   storageBucket: "docapp1-95697.appspot.com",
//   messagingSenderId: "22649389408",
//   appId: "1:22649389408:web:eb5a98c339e32a8d05de05"
// };


const firebaseConfig = {
  apiKey: "AIzaSyCrlrv-7RR4M9GsKyxz82oOC7zBM54EXGI",
  authDomain: "docapp5-ab605.firebaseapp.com",
  projectId: "docapp5-ab605",
  storageBucket: "docapp5-ab605.appspot.com",
  messagingSenderId: "242515192397",
  appId: "1:242515192397:web:7c2dd65387d448acc40a04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()

export const db = new getFirestore(app)