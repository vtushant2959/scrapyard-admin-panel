import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import toast from "../components/toast.js";
import loader from "../components/loader.js";

class PickupList {
  constructor() {
    this.container = document.getElementById("pickup-list");
  }

  async fetchPickups() {
    try {
      loader.show();

      const snapshot = await getDocs(
        collection(db, "scrap_requests")
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
      this.container.innerHTML = "<p>No pickup requests found</p>";
      return;
    }

    snapshot.forEach((docItem) => {
      const pickup = docItem.data();

      const card = document.createElement("div");
      card.className = "pickup-card";

      const nameEl = document.createElement("h3");
      nameEl.textContent = pickup.customerName || "-";

      const addressEl = document.createElement("p");
      addressEl.textContent = pickup.address || "-";

      const statusEl = document.createElement("span");
      statusEl.textContent = pickup.status || "-";

      card.appendChild(nameEl);
      card.appendChild(addressEl);
      card.appendChild(statusEl);

      this.container.appendChild(card);
    });
  }
}

export default PickupList;
