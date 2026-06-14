class Toast {
  constructor() {
    if (document.getElementById("toast-container")) return;
    const el = document.createElement("div");
    el.id = "toast-container";
    el.className = "toast-container";
    document.body.appendChild(el);
  }

  show(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(110%)";
      toast.style.transition = "all .3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

const toast = new Toast();
export default toast;
