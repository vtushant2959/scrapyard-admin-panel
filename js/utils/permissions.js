import roles from "../admins/roles.js";

class Permissions {
  async canManageAdmins() {
    return await roles.hasAccess([
      "Super Admin"
    ]);
  }

  async canManageUsers() {
    return await roles.hasAccess([
      "Super Admin",
      "Admin"
    ]);
  }

  async canManageProducts() {
    return await roles.hasAccess([
      "Super Admin",
      "Admin"
    ]);
  }

  async canManageOrders() {
    return await roles.hasAccess([
      "Super Admin",
      "Admin"
    ]);
  }

  async canViewAnalytics() {
    return await roles.hasAccess([
      "Super Admin",
      "Admin"
    ]);
  }
}

const permissions = new Permissions();

export default permissions;