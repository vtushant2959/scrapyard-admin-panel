const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

exports.cleanupOldData = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => {
    try {
      const db = admin.firestore();

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const oldNotifications = await db
        .collection("notifications")
        .where("createdAt", "<=", thirtyDaysAgo)
        .get();

      const batch = db.batch();

      oldNotifications.forEach((doc) => {
        batch.delete(doc.ref);
      });

      const deletedProducts = await db
        .collection("products")
        .where("isDeleted", "==", true)
        .get();

      deletedProducts.forEach((doc) => {
        batch.delete(doc.ref);
      });

      const oldReviews = await db
        .collection("reviews")
        .where("isSpam", "==", true)
        .get();

      oldReviews.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      console.log("Cleanup completed successfully");

      return null;
    } catch (error) {
      console.error("Cleanup failed:", error);
      return null;
    }
  });