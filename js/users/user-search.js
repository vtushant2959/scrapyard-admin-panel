class UserSearch {
  constructor() {
    this.searchInput = document.getElementById("user-search");
    this.init();
  }

  init() {
    if (!this.searchInput) return;

    this.searchInput.addEventListener("keyup", () => {
      this.searchUsers();
    });
  }

  searchUsers() {
    /* Re-query every time so newly loaded cards are included */
    const cards = document.querySelectorAll(".user-card");
    const value = this.searchInput.value.toLowerCase();

    cards.forEach((card) => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });
  }
}

export default UserSearch;
