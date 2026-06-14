import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import toast from "../components/toast.js";
import loader from "../components/loader.js";

class UsersList {
  constructor() {
    this.container = document.getElementById("users-list");
  }

  async fetchUsers() {
    try {
      loader.show();

      const snapshot = await getDocs(
        collection(db, "users")
      );

      this.render(snapshot);
    } catch (error) {
      console.error(error);
      toast.show(error.message, "error");
    } finally {
      loader.hide();
    }
  }

  render(snapshot) {
    if (!this.container) return;

    this.container.innerHTML = "";

    if (snapshot.empty) {
      this.container.innerHTML = "<p>No users found</p>";
      return;
    }

    snapshot.forEach((docItem) => {
      const user = docItem.data();

      const card = document.createElement("div");
      card.className = "user-card";

      const nameEl = document.createElement("h3");
      nameEl.textContent = user.name || "-";

      const emailEl = document.createElement("p");
      emailEl.textContent = user.email || "-";

      const statusEl = document.createElement("span");
      statusEl.textContent = user.status || "active";

      card.appendChild(nameEl);
      card.appendChild(emailEl);
      card.appendChild(statusEl);

      this.container.appendChild(card);
    });
  }
}

export default UsersList;
