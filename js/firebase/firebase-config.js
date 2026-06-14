import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHAGKy4fqkoHqFbsHGVl5Y6Xzl8L1-Iw4",
  authDomain: "scrapyard-sunrise-metals.firebaseapp.com",
  projectId: "scrapyard-sunrise-metals",
  storageBucket: "scrapyard-sunrise-metals.firebasestorage.app",
  messagingSenderId: "899016897090",
  appId: "1:899016897090:web:a595d056af69940060b3db"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };