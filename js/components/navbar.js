import { auth } from "../firebase/firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { openSidebar } from "./sidebar.js";

class Navbar {
  render() {
    const container = document.getElementById("navbar");
    if (!container) return;

    container.innerHTML = `
      <nav class="navbar">
        <div class="navbar-left">
          <button class="menu-toggle" id="menuToggle">&#9776;</button>
          <div class="navbar-search">
            <span class="navbar-search-icon">&#128269;</span>
            <input type="text" placeholder="Search..." id="globalSearch" />
          </div>
        </div>
        <div class="navbar-right">
          <a href="/pages/notifications.html" class="navbar-notif" title="Notifications">
            &#128276;
            <span class="notif-dot"></span>
          </a>
          <a href="/pages/profile.html" class="navbar-user" title="My Profile" style="cursor:pointer;">
            <div class="navbar-user-avatar" id="userAvatar">A</div>
            <span class="navbar-user-name" id="userEmail">Admin</span>
          </a>
        </div>
      </nav>
    `;

    onAuthStateChanged(auth, (user) => {
      const emailEl = document.getElementById("userEmail");
      const avatarEl = document.getElementById("userAvatar");
      if (user && emailEl) {
        const name = user.email.split("@")[0];
        emailEl.textContent = user.email;
        if (avatarEl) avatarEl.textContent = name[0].toUpperCase();
      }
    });

    document.getElementById("menuToggle")?.addEventListener("click", openSidebar);
  }
}

const navbar = new Navbar();
export default navbar;
