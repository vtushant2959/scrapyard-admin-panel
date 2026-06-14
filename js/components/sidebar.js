import authService from "../firebase/auth.js";

class Sidebar {
  async render() {
    const container = document.getElementById("sidebar-container");
    if (!container) return;

    const res = await fetch("/components/sidebar.html");
    const html = await res.text();
    container.innerHTML = html;

    this._markActive();
    this._attachLogout();
    this._attachOverlay();
  }

  _markActive() {
    const path = window.location.pathname;
    document.querySelectorAll(".sidebar-link").forEach((link) => {
      const page = link.dataset.page;
      const active =
        (page === "dashboard" && path.endsWith("dashboard.html")) ||
        (page !== "dashboard" && path.includes(page));
      if (active) link.classList.add("active");
    });
  }

  _attachLogout() {
    const btn = document.getElementById("logoutBtn");
    if (!btn) return;
    btn.addEventListener("click", async () => {
      await authService.logout();
      window.location.href = "/login.html";
    });
  }

  _attachOverlay() {
    const overlay = document.getElementById("sidebarOverlay");
    if (!overlay) return;
    overlay.addEventListener("click", () => closeSidebar());
  }
}

export function openSidebar() {
  document.getElementById("sidebar")?.classList.add("open");
  document.getElementById("sidebarOverlay")?.classList.add("active");
}

export function closeSidebar() {
  document.getElementById("sidebar")?.classList.remove("open");
  document.getElementById("sidebarOverlay")?.classList.remove("active");
}

const sidebar = new Sidebar();
export default sidebar;
