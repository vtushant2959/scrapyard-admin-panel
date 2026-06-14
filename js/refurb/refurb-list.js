import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import toast from "../components/toast.js";
import loader from "../components/loader.js";

class RefurbList {
  constructor() {
    this.container = document.getElementById("refurb-list");
  }

  async fetchProducts() {
    try {
      loader.show();

      const snapshot = await getDocs(
        collection(db, "refurbished_products")
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
      this.container.innerHTML = "<p>No refurbished products found</p>";
      return;
    }

    snapshot.forEach((docItem) => {
      const item = docItem.data();

      const card = document.createElement("div");
      card.className = "refurb-card";

      const img = document.createElement("img");
      img.src = item.image || "/assets/images/product-placeholder.png";
      img.alt = item.name || "";

      const nameEl = document.createElement("h3");
      nameEl.textContent = item.name;

      const priceEl = document.createElement("p");
      priceEl.textContent = `₹${item.price}`;

      const catEl = document.createElement("p");
      catEl.textContent = item.category;

      card.appendChild(img);
      card.appendChild(nameEl);
      card.appendChild(priceEl);
      card.appendChild(catEl);

      this.container.appendChild(card);
    });
  }
}

export default RefurbList;
