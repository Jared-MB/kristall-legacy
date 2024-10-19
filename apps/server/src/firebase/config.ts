// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD2YZ3MT-aVDDBDyr6f-DLHAfXeSi4q-hM',
  authDomain: 'kristall-f8aa1.firebaseapp.com',
  projectId: 'kristall-f8aa1',
  storageBucket: 'kristall-f8aa1.appspot.com',
  messagingSenderId: '391227727554',
  appId: '1:391227727554:web:f24c11d43cab99b464e55b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);
