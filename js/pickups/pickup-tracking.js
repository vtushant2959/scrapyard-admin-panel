import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";

export async function trackPickup(id) {
  const snapshot = await getDoc(
    doc(db, "scrap_requests", id)
  );

  if (snapshot.exists()) {
    return snapshot.data();
  }

  return null;
}