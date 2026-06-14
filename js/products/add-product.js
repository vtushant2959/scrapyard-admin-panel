import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import storageService from "../firebase/storage.js";
import toast from "../components/toast.js";
import loader from "../components/loader.js";

class AddProduct {
  constructor() {
    this.form = document.getElementById("add-product-form");

    if (this.form) {
      this.form.addEventListener(
        "submit",
        (e) => this.handleSubmit(e)
      );
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    try {
      loader.show();

      const name = document.getElementById("product-name").value.trim();
      const category = document.getElementById("product-category").value.trim();
      const price = document.getElementById("product-price").value;
      const imageFile = document.getElementById("product-image").files[0];

      if (!name || !category || !price || !imageFile) {
        toast.show("All fields are required", "error");
        return;
      }

      const uploaded = await storageService.upload(
        imageFile,
        "products"
      );

      await addDoc(collection(db, "products"), {
        name,
        category,
        price: Number(price),
        image: uploaded.url,
        imagePath: uploaded.path,
        createdAt: serverTimestamp()
      });

      toast.show("Product added successfully");
      this.form.reset();
    } catch (error) {
      console.error(error);
      toast.show(error.message, "error");
    } finally {
      loader.hide();
    }
  }
}

export default AddProduct;
