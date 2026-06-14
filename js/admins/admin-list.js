import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import toast from "../components/toast.js";
import loader from "../components/loader.js";

class AdminList {
  constructor() {
    this.container = document.getElementById("admin-list");
  }

  async fetchAdmins() {
    try {
      loader.show();

      const querySnapshot = await getDocs(
        collection(db, "admins")
      );

      this.renderAdmins(querySnapshot);
    } catch (error) {
      console.error(error);
      toast.show(error.message, "error");
    }

    loader.hide();
  }

  renderAdmins(snapshot) {
    if (!this.container) return;

    this.container.innerHTML = "";

    if (snapshot.empty) {
      this.container.innerHTML = `
        <p>No admins found</p>
      `;
      return;
    }

    snapshot.forEach((docItem) => {
      const admin = docItem.data();

      const card = document.createElement("div");
      card.className = "admin-card";

      const info = document.createElement("div");
      info.className = "admin-info";

      const emailEl = document.createElement("h3");
      emailEl.textContent = admin.email;

      const roleEl = document.createElement("p");
      roleEl.textContent = admin.role;

      info.appendChild(emailEl);
      info.appendChild(roleEl);

      const actions = document.createElement("div");
      actions.className = "admin-actions";

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-admin-btn";
      deleteBtn.dataset.id = docItem.id;
      deleteBtn.textContent = "Delete";

      actions.appendChild(deleteBtn);
      card.appendChild(info);
      card.appendChild(actions);

      this.container.appendChild(card);
    });

    this.attachDeleteEvents();
  }

  attachDeleteEvents() {
    const buttons = document.querySelectorAll(
      ".delete-admin-btn"
    );

    buttons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;

        await this.deleteAdmin(id);
      });
    });
  }

  async deleteAdmin(id) {
    try {
      loader.show();

      await deleteDoc(doc(db, "admins", id));

      toast.show("Admin deleted");

      await this.fetchAdmins();
    } catch (error) {
      console.error(error);
      toast.show(error.message, "error");
    }

    loader.hide();
  }
}

export default AdminList;