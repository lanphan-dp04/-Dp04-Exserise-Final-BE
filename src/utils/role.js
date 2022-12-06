const Role = {
  STAFF: 'staff',
  MASTER: 'master',
  ADMIN: 'admin'
}

const PERMISSIONS = {
  READ_LEAVE: 'read_leave'
}

const staffPermissions = [
  PERMISSIONS.READ_LEAVE
]
module.exports = {Role , PERMISSIONS, staffPermissions}