import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import toast from "../components/toast.js";
import loader from "../components/loader.js";

class ReviewsList {
  constructor() {
    this.container = document.getElementById("reviews-list");
  }

  async fetchReviews() {
    try {
      loader.show();

      const snapshot = await getDocs(
        collection(db, "reviews")
      );

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
      this.container.innerHTML = "<p>No reviews found</p>";
      return;
    }

    snapshot.forEach((docItem) => {
      const review = docItem.data();

      const card = document.createElement("div");
      card.className = "review-card";

      const nameEl = document.createElement("h3");
      nameEl.textContent = review.userName || "Anonymous";

      const msgEl = document.createElement("p");
      msgEl.textContent = review.message || "";

      const ratingEl = document.createElement("span");
      ratingEl.textContent = `${review.rating} ★`;

      card.appendChild(nameEl);
      card.appendChild(msgEl);
      card.appendChild(ratingEl);

      this.container.appendChild(card);
    });
  }
}

export default ReviewsList;
