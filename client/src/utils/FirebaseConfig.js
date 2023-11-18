import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDWVSWqxwYDrbQ5-MDDV9jsz2gFkSUtxT8",
    authDomain: "whatsapp-web-clone-adv.firebaseapp.com",
    projectId: "whatsapp-web-clone-adv",
    storageBucket: "whatsapp-web-clone-adv.appspot.com",
    messagingSenderId: "880539983564",
    appId: "1:880539983564:web:9fa5c8bed4d2cbcba8ec69",
    measurementId: "G-G19RG54ZE0"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

   