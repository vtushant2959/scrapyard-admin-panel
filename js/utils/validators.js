/* ==========================================
   VALIDATORS
========================================== */

export function validateEmail(email) {
  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

export function validatePassword(password) {
  if (!password) return false;

  return password.length >= 6;
}

export function validateRequired(value) {
  return value && value.trim() !== "";
}

export function validateNumber(value) {
  return !isNaN(value);
}

export function validatePrice(value) {
  return Number(value) > 0;
}