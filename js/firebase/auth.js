import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  auth,
  db
} from "./firebase-config.js";

class AuthService {
  async login(email, password) {
    try {
      await setPersistence(
        auth,
        browserLocalPersistence
      );

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user =
        userCredential.user;

      const adminRef = doc(
        db,
        "admins",
        user.uid
      );

      const adminDoc =
        await getDoc(adminRef);

      if (!adminDoc.exists()) {
        await signOut(auth);

        throw new Error(
          "Unauthorized admin"
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    await signOut(auth);
  }

  watchUser(callback) {
    onAuthStateChanged(
      auth,
      (user) => {
        callback(user);
      }
    );
  }

  getCurrentUser() {
    return auth.currentUser;
  }
}

const authService =
  new AuthService();

export default authService;