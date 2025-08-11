import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6hJucsfVjf3n92Orz6ggpq2ahG-wPnqQ",
  authDomain: "edusync-52581.firebaseapp.com",
  projectId: "edusync-52581",
  storageBucket: "edusync-52581.firebasestorage.app",
  messagingSenderId: "237593533585",
  appId: "1:237593533585:web:2ba6305edff65f01b17330"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// This ensures that the user's session is persisted in the browser's local storage.
// This will keep the user signed in across browser sessions.
setPersistence(auth, browserLocalPersistence);

export { app, auth };
