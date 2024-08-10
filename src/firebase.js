// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
export const firebaseConfig = {

  // Testing  // always use these details
  
  apiKey: "AIzaSyA0Ov2Gz23eeWAnx6owfJntGFg2Oz6zntc",
  authDomain: "payrol-a13e6.firebaseapp.com",
  projectId: "payrol-a13e6",
  storageBucket: "payrol-a13e6.appspot.com",
  messagingSenderId: "43729809537",
  appId: "1:43729809537:web:ade3b46a736e665d61dd80",


  // Production
  // apiKey: "AIzaSyBs96KZqNbe8pYiEnWOxIBmnDehGxKKfzg",
  // authDomain: "payroll-c8625.firebaseapp.com",
  // projectId: "payroll-c8625",
  // storageBucket: "payroll-c8625.appspot.com",
  // messagingSenderId: "727671119218",
  // appId: "1:727671119218:web:9c76f0197d8839b2efd1eb"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
