import authService from "../firebase/auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  db
} from "../firebase/firebase-config.js";

authService.watchUser(
  async (user) => {
    try {
      const currentPage =
        window.location.pathname;

      /* If no user */
      if (!user) {
        if (
          !currentPage.includes(
            "login.html"
          )
        ) {
          window.location.replace(
            "/login.html"
          );
        }

        return;
      }

      /* Check admin role */
      const adminRef = doc(
        db,
        "admins",
        user.uid
      );

      const adminDoc =
        await getDoc(adminRef);

      /* Unauthorized user */
      if (!adminDoc.exists()) {
        await authService.logout();

        window.location.replace(
          "/login.html"
        );

        return;
      }

    } catch (error) {
      console.error(
        "Auth Guard Error:",
        error
      );

      window.location.replace(
        "/login.html"
      );
    }
  }
);