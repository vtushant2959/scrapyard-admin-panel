/* ==========================================
   DATE FORMATTERS
========================================== */

export function formatDate(timestamp) {
  if (!timestamp) return "-";

  const date = timestamp.toDate
    ? timestamp.toDate()
    : new Date(timestamp);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function formatDateTime(timestamp) {
  if (!timestamp) return "-";

  const date = timestamp.toDate
    ? timestamp.toDate()
    : new Date(timestamp);

  return date.toLocaleString("en-IN");
}

export function getTimeAgo(timestamp) {
  if (!timestamp) return "-";

  const date = timestamp.toDate
    ? timestamp.toDate()
    : new Date(timestamp);

  const now = new Date();
  const diff = now - date;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hrs ago`;

  return `${days} days ago`;
}