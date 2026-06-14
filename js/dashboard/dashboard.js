import sidebar from "../components/sidebar.js";
import navbar from "../components/navbar.js";
import loader from "../components/loader.js";

import { getAnalytics } from "./analytics.js";
import { renderCharts } from "./charts.js";

document.addEventListener("DOMContentLoaded", async () => {
  loader.show();

  sidebar.render();
  navbar.render();

  try {
    const analytics = await getAnalytics();

    document.getElementById("total-users").innerText =
      analytics.totalUsers;

    document.getElementById("total-orders").innerText =
      analytics.totalOrders;

    document.getElementById("total-products").innerText =
      analytics.totalProducts;

    document.getElementById("total-scrap-requests").innerText =
      analytics.totalScrapRequests;

    renderCharts(analytics);
  } catch (error) {
    console.error(error);
  }

  loader.hide();
});