import type { PermissionsUnionType } from './permissions';
import type { UserRoleUnionType } from './roles';

export module IROLE {
  export type UserRole = UserRoleUnionType;
  export type Permissions = PermissionsUnionType;
  export type RoleObject = {
    role: UserRole;
    permissions: Partial<Record<Permissions, boolean>>;
  };
  export type IRoles = {
    INTERN: RoleObject;
    MANAGER: RoleObject;
    SUPERVISOR: RoleObject;
    ADMIN: RoleObject;
    UNAUTHORIZED: RoleObject;
  };
}

export const ROLES: IROLE.IRoles = {
  INTERN: { role: 'Intern', permissions: {} },
  MANAGER: { role: 'Manager', permissions: {} },
  SUPERVISOR: { role: 'Supervisor', permissions: {} },
  ADMIN: { role: 'Admin', permissions: {} },
  UNAUTHORIZED: { role: 'Unauthorized', permissions: {} }
};
