import sidebar from "./components/sidebar.js";
import navbar from "./components/navbar.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await sidebar.render();
    navbar.render();
  } catch (error) {
    console.error("Layout init error:", error);
  }
});
