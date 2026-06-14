import firestoreService from "../firebase/firestore.js";

class OrderList {
  constructor() {
    this.container =
      document.getElementById("orders-list");
  }

  async fetchOrders() {
    const snapshot =
      await firestoreService.getCollection(
        "orders"
      );

    this.render(snapshot);
  }

  render(snapshot) {
    this.container.innerHTML = "";

    snapshot.forEach((docItem) => {
      const order = docItem.data();

      const card =
        document.createElement("div");

      card.className = "order-card";

      card.innerHTML = `
        <h3>${order.orderId || "N/A"}</h3>
        <p>${order.status || "Pending"}</p>
      `;

      this.container.appendChild(card);
    });
  }
}

export default OrderList;