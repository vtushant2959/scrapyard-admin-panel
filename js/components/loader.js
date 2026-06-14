class Loader {
  constructor() {
    if (document.getElementById("global-loader")) return;
    const el = document.createElement("div");
    el.id = "global-loader";
    el.innerHTML = `<div class="loader-spinner"></div>`;
    document.body.appendChild(el);
  }

  show() {
    document.getElementById("global-loader")?.classList.add("visible");
  }

  hide() {
    document.getElementById("global-loader")?.classList.remove("visible");
  }
}

const loader = new Loader();
export default loader;
