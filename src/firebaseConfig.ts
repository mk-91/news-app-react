// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCkKpCW9tz9-cw3dH-ZHwTgSXuDKQQ2lwM',
  authDomain: 'newsapp-7be49.firebaseapp.com',
  projectId: 'newsapp-7be49',
  storageBucket: 'newsapp-7be49.appspot.com',
  messagingSenderId: '638409421180',
  appId: '1:638409421180:web:0b8fa748d3727f607bf4f9',
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
