import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import toast from "../components/toast.js";
import loader from "../components/loader.js";

class PaymentList {
  constructor() {
    this.container = document.getElementById("payment-list");
  }

  async fetchPayments() {
    try {
      loader.show();

      const snapshot = await getDocs(collection(db, "payments"));

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
      this.container.innerHTML = "<p>No payments found</p>";
      return;
    }

    snapshot.forEach((docItem) => {
      const payment = docItem.data();

      const card = document.createElement("div");
      card.className = "payment-card";

      const amountEl = document.createElement("h3");
      amountEl.textContent = `₹${payment.amount}`;

      const methodEl = document.createElement("p");
      methodEl.textContent = payment.paymentMethod || "-";

      const statusEl = document.createElement("span");
      statusEl.textContent = payment.status || "-";

      card.appendChild(amountEl);
      card.appendChild(methodEl);
      card.appendChild(statusEl);

      this.container.appendChild(card);
    });
  }
}

export default PaymentList;
