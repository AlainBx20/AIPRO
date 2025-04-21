import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyCJ5534fn1f0tqJSe6bIgzp7RbBz3OhmbA",
  authDomain: "auth-e83f1.firebaseapp.com",
  projectId: "auth-e83f1",
 storageBucket: "auth-e83f1.firebasestorage.app",
   messagingSenderId: "55680546038",
  appId: "1:55680546038:web:8588c0953110e9c9b5e8d7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();