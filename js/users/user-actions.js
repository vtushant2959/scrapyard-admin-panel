import {
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";

class UserActions {
  async blockUser(id) {
    await updateDoc(doc(db, "users", id), {
      status: "blocked"
    });
  }

  async deleteUser(id) {
    await deleteDoc(doc(db, "users", id));
  }
}

export default UserActions;