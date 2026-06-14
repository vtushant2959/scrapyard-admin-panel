import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import toast from "../components/toast.js";
import loader from "../components/loader.js";

class ProductList {
  constructor() {
    this.container = document.getElementById("products-list");
  }

  async fetchProducts() {
    try {
      loader.show();

      const snapshot = await getDocs(
        collection(db, "products")
      );

      this.render(snapshot);
    } catch (error) {
      console.error(error);
      toast.show(error.message, "error");
    } finally {
      loader.hide();
    }
  }

  async deleteProduct(id) {
    try {
      loader.show();

      await deleteDoc(doc(db, "products", id));

      toast.show("Product deleted");
      await this.fetchProducts();
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
      this.container.innerHTML = "<p>No products found</p>";
      return;
    }

    snapshot.forEach((docItem) => {
      const product = docItem.data();

      const card = document.createElement("div");
      card.className = "product-card";

      const img = document.createElement("img");
      img.src = product.image || "/assets/images/product-placeholder.png";
      img.alt = product.name || "";

      const nameEl = document.createElement("h3");
      nameEl.textContent = product.name;

      const catEl = document.createElement("p");
      catEl.textContent = product.category;

      const priceEl = document.createElement("p");
      priceEl.textContent = `₹${product.price}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-product-btn";
      deleteBtn.dataset.id = docItem.id;
      deleteBtn.textContent = "Delete";

      card.appendChild(img);
      card.appendChild(nameEl);
      card.appendChild(catEl);
      card.appendChild(priceEl);
      card.appendChild(deleteBtn);

      this.container.appendChild(card);
    });

    this.attachEvents();
  }

  attachEvents() {
    const buttons = document.querySelectorAll(".delete-product-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        await this.deleteProduct(id);
      });
    });
  }
}

export default ProductList;
