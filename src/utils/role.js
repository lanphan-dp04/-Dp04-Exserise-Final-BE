export const PERMISSIONS = {
  WRITE_LEAVE: 'write_leave',
  READ_LEAVE: 'read_leave',
  APPROVE_LEAVE: 'approve_leave',
};

const staffPermissions: any = [
  PERMISSIONS.WRITE_LEAVE,
  PERMISSIONS.READ_LEAVE,
];
const adminPermissions: any = [
  ...staffPermissions
];

const masterPermissions: any = [
  ...staffPermissions,
  PERMISSIONS.APPROVE_LEAVE
];


export enum RoleName {
  staff = 'staff',
  admin = 'admin',
  master = 'master',
}

export interface Role {
  roleName: string;
  permissions?: any;
}

export class RoleModel implements Role {
  roleName: string;
  permissions?: any;

  constructor(roleName: string, permissions?: any) {
    this.roleName = roleName;
    this.permissions = permissions;
  }

  static construct({ roleName, permissions }: RoleModel) {
    return new RoleModel(roleName, permissions);
  }

  static permissions(roleName: string) {
    const p: { [key: string]: any } = {
      staff: staffPermissions,
      admin: adminPermissions,
      master: staffPermissions,
    };
    return p[roleName] || [];
  }
}
