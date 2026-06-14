export function renderCharts(analytics = {}) {
  const orderCtx = document
    .getElementById("ordersChart")
    ?.getContext("2d");

  if (orderCtx) {
    new Chart(orderCtx, {
      type: "bar",
      data: {
        labels: ["Users", "Orders", "Products", "Scrap Requests"],
        datasets: [{
          label: "Overview",
          data: [
            analytics.totalUsers ?? 0,
            analytics.totalOrders ?? 0,
            analytics.totalProducts ?? 0,
            analytics.totalScrapRequests ?? 0
          ],
          backgroundColor: [
            "rgba(37, 99, 235, 0.7)",
            "rgba(16, 185, 129, 0.7)",
            "rgba(245, 158, 11, 0.7)",
            "rgba(239, 68, 68, 0.7)"
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
