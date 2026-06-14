import {
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";

export async function editProduct(
  id,
  updatedData
) {
  await updateDoc(
    doc(db, "products", id),
    updatedData
  );
}