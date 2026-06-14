import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import toast from "../components/toast.js";

class Settings {
  constructor() {
    this.form = document.getElementById("settings-form");
    this.docId = "main_settings";

    this.init();
  }

  async init() {
    if (!this.form) return;

    await this.loadSettings();

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveSettings();
    });
  }

  async loadSettings() {
    const docRef = await getDoc(
      doc(db, "settings", this.docId)
    );

    if (docRef.exists()) {
      const data = docRef.data();

      document.getElementById("site-name").value = data.siteName || "";
      document.getElementById("support-email").value = data.supportEmail || "";
    }
  }

  async saveSettings() {
    try {
      const siteName = document.getElementById("site-name").value;
      const supportEmail = document.getElementById("support-email").value;

      await updateDoc(
        doc(db, "settings", this.docId),
        {
          siteName,
          supportEmail
        }
      );

      toast.show("Settings saved");
    } catch (error) {
      toast.show(error.message, "error");
    }
  }
}

export default Settings;