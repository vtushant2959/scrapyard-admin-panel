import firestoreService from "./firestore.js";

class NotificationService {
  async sendNotification(data) {
    await firestoreService.addDocument(
      "notifications",
      {
        title: data.title,
        message: data.message,
        type: data.type || "general"
      }
    );
  }
}

const notificationService =
  new NotificationService();

export default notificationService;