import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dummy.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dummy-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "dummy-sender",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "dummy-app"
};

let auth = null;
let db = null;

try {
  // Only initialize if we have at least an API key that doesn't look like a placeholder
  if (import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== "your_api_key") {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    console.warn("Firebase API key missing. Authentication and Firestore will be disabled.");
  }
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
}

export { auth, db };

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  if (!auth) {
    alert("Firebase is not configured. Please add your API keys to the .env file.");
    return null;
  }
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    return null;
  }
};

export const logout = () => auth ? signOut(auth) : Promise.resolve();

export const saveUserData = async (uid, data) => {
  if (!db) return;
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true });
  } catch (error) {
    console.error("Error saving user data", error);
  }
};

export const getUserData = async (uid) => {
  if (!db) return null;
  try {
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.error("Error getting user data", error);
  }
  return null;
};
