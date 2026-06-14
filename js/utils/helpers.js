/* ==========================================
   HELPERS
========================================== */

export function generateId(prefix = "SCRAP") {
  const random = crypto.randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase();

  return `${prefix}-${random}`;
}

export function capitalize(text) {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function truncateText(text, maxLength = 50) {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength) + "...";
}

export function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export function getInitials(name) {
  if (!name) return "";

  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();
}