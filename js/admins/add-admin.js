import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import toast from "../components/toast.js";
import loader from "../components/loader.js";

class AddAdmin {
  constructor() {
    this.form = document.getElementById("add-admin-form");
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.createAdmin();
    });
  }

  async createAdmin() {
    try {
      loader.show();

      const uid = document.getElementById("admin-uid").value.trim();
      const email = document.getElementById("admin-email").value.trim();
      const role = document.getElementById("admin-role").value;

      if (!uid || !email || !role) {
        toast.show("All fields are required", "error");
        return;
      }

      /* Document ID must equal the Firebase Auth UID so auth-guard can find it */
      await setDoc(doc(db, "admins", uid), {
        email,
        role,
        createdAt: serverTimestamp()
      });

      toast.show("Admin added successfully");
      this.form.reset();
    } catch (error) {
      console.error(error);
      toast.show(error.message, "error");
    } finally {
      loader.hide();
    }
  }
}

export default AddAdmin;
