import {
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import toast from "../components/toast.js";

class EditRefurb {
  async updateProduct(id, updatedData) {
    try {
      await updateDoc(
        doc(db, "refurbished_products", id),
        updatedData
      );

      toast.show("Refurb updated");
    } catch (error) {
      toast.show(error.message, "error");
    }
  }
}

export default EditRefurb;