import {
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";

export async function deleteRefurb(id) {
  await deleteDoc(
    doc(db, "refurbished_products", id)
  );
}