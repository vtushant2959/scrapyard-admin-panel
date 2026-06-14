const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

exports.verifyPayment = functions.firestore
  .document("payments/{paymentId}")
  .onCreate(async (snapshot, context) => {
    try {
      const paymentData = snapshot.data();

      const amount = paymentData.amount;
      const userId = paymentData.userId;
      const status = paymentData.status;

      if (!amount || !userId) {
        throw new Error("Missing payment details");
      }

      if (status === "success") {
        await admin.firestore()
          .collection("users")
          .doc(userId)
          .update({
            lastPaymentAt: admin.firestore.FieldValue.serverTimestamp(),
            paymentStatus: "paid",
          });

        await snapshot.ref.update({
          verified: true,
          verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        console.log("Payment verified");
      } else {
        await snapshot.ref.update({
          verified: false,
        });

        console.log("Payment failed");
      }

      return null;
    } catch (error) {
      console.error("Payment verification failed:", error);

      await snapshot.ref.update({
        error: error.message,
      });

      return null;
    }
  });