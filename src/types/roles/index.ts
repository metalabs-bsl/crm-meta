import type { PermissionsUnionType } from './permissions';
import type { UserRoletTitle, UserRoleUnionType } from './roles';

export module IROLE {
  export type UserRole = UserRoleUnionType;
  export type UserTitle = UserRoletTitle;
  export type Permissions = PermissionsUnionType;

  export type RoleObject = {
    role: UserRole;
    title: UserTitle;
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
  INTERN: { role: 'Intern', title: 'Стажёр', permissions: {} },
  MANAGER: { role: 'Manager', title: 'Менеджер', permissions: {} },
  SUPERVISOR: { role: 'Supervisor', title: 'Менеджер - Руководитель', permissions: {} },
  ADMIN: { role: 'Admin', title: 'Администратор', permissions: {} },
  UNAUTHORIZED: { role: 'Unauthorized', title: 'Неавторизованный', permissions: {} }
};
