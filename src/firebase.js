import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfS_XxEQvuLyvdG8IxhS5ZHpKoA_qAu3A",
  authDomain: "qaz-live-1.firebaseapp.com",
  projectId: "qaz-live-1",
  storageBucket: "qaz-live-1.firebasestorage.app",
  messagingSenderId: "414702032982",
  appId: "1:414702032982:web:7906641961ab268e3043f7",
  measurementId: "G-JV0W0QHZWH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
