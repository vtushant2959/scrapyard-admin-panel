import roles from "../admins/roles.js";

async function checkAccess(requiredRoles) {
  const hasAccess =
    await roles.hasAccess(requiredRoles);

  if (!hasAccess) {
    window.location.href = "/dashboard.html";
  }
}

export default checkAccess;