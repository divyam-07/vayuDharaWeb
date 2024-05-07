import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7VHlrMkadL4FB7na0ePd7xxJaQRm2JSs",
  authDomain: "chatgptmessanger-8a8a4.firebaseapp.com",
  projectId: "chatgptmessanger-8a8a4",
  storageBucket: "chatgptmessanger-8a8a4.appspot.com",
  messagingSenderId: "30807285414",
  appId: "1:30807285414:web:0784d872bf50ca3d7c1e67",
  measurementId: "G-BYYD3M1KER",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
