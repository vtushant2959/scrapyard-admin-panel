import firestoreService from "../firebase/firestore.js";

class OrderStatus {
  async updateStatus(orderId, status) {
    await firestoreService.updateDocument(
      "orders",
      orderId,
      {
        status
      }
    );
  }
}

const orderStatus =
  new OrderStatus();

export default orderStatus;