import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3Lz4AyQNGfTn-G2rRRPufelACNNqceGA",
  authDomain: "SellBuyBooks-6c9a5.firebaseapp.com",
  projectId: "SellBuyBooks-6c9a5",
  storageBucket: "SellBuyBooks-6c9a5.appspot.com",
  messagingSenderId: "512060512461",
  appId: "1:512060512461:web:cfb04c049f922fe73b7184",
  measurementId: "G-M7RKWDR2ZK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();


export { auth, provider };