class Modal {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.id = "global-modal";
    document.body.appendChild(this.modal);
  }

  open(title, content) {
    this.modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-box">
          <div class="modal-header">
            <h2 id="modal-title"></h2>
            <button id="close-modal">×</button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
        </div>
      </div>
    `;

    /* Set title via textContent to prevent XSS */
    document.getElementById("modal-title").textContent = title;

    this.modal.style.display = "block";

    document
      .getElementById("close-modal")
      .addEventListener("click", () => this.close());
  }

  close() {
    this.modal.style.display = "none";
  }
}

const modal = new Modal();

export default modal;