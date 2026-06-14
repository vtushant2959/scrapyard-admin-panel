import {
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";

export async function updatePickupStatus(
  pickupId,
  newStatus
) {
  await updateDoc(
    doc(db, "scrap_requests", pickupId),
    {
      status: newStatus
    }
  );
}