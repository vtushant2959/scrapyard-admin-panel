import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import loader from "../components/loader.js";
import toast from "../components/toast.js";

class AddRefurb {
  constructor() {
    this.form = document.getElementById("add-refurb-form");
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addProduct();
    });
  }

  async addProduct() {
    try {
      loader.show();

      const name = document.getElementById("refurb-name").value.trim();
      const price = Number(document.getElementById("refurb-price").value);
      const category = document.getElementById("refurb-category").value.trim();
      const image = document.getElementById("refurb-image").value.trim();
      const description = document.getElementById("refurb-description").value.trim();

      await addDoc(collection(db, "refurbished_products"), {
        name,
        price,
        category,
        image,
        description,
        createdAt: serverTimestamp()
      });

      toast.show("Refurb product added");
      this.form.reset();

    } catch (error) {
      toast.show(error.message, "error");
    }

    loader.hide();
  }
}

export default AddRefurb;