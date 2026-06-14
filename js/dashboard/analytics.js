import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "../firebase/firebase-config.js";

export async function getAnalytics() {
  const users = await getDocs(collection(db, "users"));
  const orders = await getDocs(collection(db, "orders"));
  const products = await getDocs(collection(db, "products"));
  const scrapRequests = await getDocs(collection(db, "scrap_requests"));

  return {
    totalUsers: users.size,
    totalOrders: orders.size,
    totalProducts: products.size,
    totalScrapRequests: scrapRequests.size
  };
}