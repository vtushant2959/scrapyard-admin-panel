import {
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";
import toast from "../components/toast.js";

class ReviewActions {
  async hideReview(id) {
    try {
      await updateDoc(doc(db, "reviews", id), {
        isHidden: true
      });

      toast.show("Review hidden");
    } catch (error) {
      toast.show(error.message, "error");
    }
  }

  async deleteReview(id) {
    try {
      await deleteDoc(doc(db, "reviews", id));

      toast.show("Review deleted");
    } catch (error) {
      toast.show(error.message, "error");
    }
  }
}

export default ReviewActions;