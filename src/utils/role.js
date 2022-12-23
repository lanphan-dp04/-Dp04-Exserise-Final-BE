const Role = {
  STAFF: "staff",
  ADMIN: "admin",
  MANAGER: "manager",
  HR: "hr",
};

const PERMISSIONS = {
  READ_LEAVE: "read_leave",
};

const staffPermissions = [PERMISSIONS.READ_LEAVE];
module.exports = { Role, PERMISSIONS, staffPermissions };
