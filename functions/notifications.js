const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

exports.sendPushNotification = functions.firestore
  .document("notifications/{notificationId}")
  .onCreate(async (snapshot) => {
    try {
      const data = snapshot.data();

      const payload = {
        notification: {
          title: data.title || "Scrapyard Notification",
          body: data.message || "You have a new notification",
        },
        data: {
          type: data.type || "general",
          click_action: "FLUTTER_NOTIFICATION_CLICK",
        },
      };

      if (data.topic) {
        await admin.messaging().sendToTopic(data.topic, payload);
      }

      if (data.token) {
        await admin.messaging().send({
          token: data.token,
          notification: payload.notification,
          data: payload.data,
        });
      }

      await snapshot.ref.update({
        status: "sent",
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log("Notification sent successfully");
      return null;
    } catch (error) {
      console.error("Notification error:", error);

      await snapshot.ref.update({
        status: "failed",
        error: error.message,
      });

      return null;
    }
  });