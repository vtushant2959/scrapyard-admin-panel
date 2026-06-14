import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { auth, db } from "../firebase/firebase-config.js";

/* Wait for Firebase Auth to resolve before checking the user */
function getAuthUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

class Roles {
  async getCurrentUserRole() {
    const user = await getAuthUser();

    if (!user) return null;

    try {
      const adminDoc = await getDoc(doc(db, "admins", user.uid));

      if (adminDoc.exists()) {
        return adminDoc.data().role;
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async isSuperAdmin() {
    return (await this.getCurrentUserRole()) === "Super Admin";
  }

  async isAdmin() {
    return (await this.getCurrentUserRole()) === "Admin";
  }

  async hasAccess(requiredRoles = []) {
    const role = await this.getCurrentUserRole();
    return requiredRoles.includes(role);
  }
}

const roles = new Roles();
export default roles;
