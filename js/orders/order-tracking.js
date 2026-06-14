import {
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";

class OrderTracking {
  track(orderId, callback) {
    const orderRef = doc(
      db,
      "orders",
      orderId
    );

    onSnapshot(orderRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());
      }
    });
  }
}

const orderTracking =
  new OrderTracking();

export default orderTracking;