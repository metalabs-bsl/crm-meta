import type { PermissionsUnionType } from './permissions';
import type { UserRoletTitle, UserRoleUnionType } from './roles';

export module IROLE {
  export type UserRole = UserRoleUnionType;
  export type UserTitle = UserRoletTitle;
  export type Permissions = PermissionsUnionType;

  export type RoleObject = {
    role_name: UserRole;
    title?: UserTitle;
    permissions?: Partial<Record<Permissions, boolean>>;
    id: null | string;
  };
  export type IRoles = {
    INTERN: RoleObject;
    MANAGER: RoleObject;
    SENIOR_MANAGER: RoleObject;
    DIRECTOR: RoleObject;
    UNAUTHORIZED: RoleObject;
  };
}

export const ROLES: IROLE.IRoles = {
  INTERN: { role_name: 'Intern', title: 'Стажёр', permissions: {}, id: null },
  MANAGER: { role_name: 'Manager', title: 'Менеджер', permissions: {}, id: null },
  SENIOR_MANAGER: { role_name: 'Senior Manager', title: 'Менеджер - Руководитель', permissions: {}, id: null },
  DIRECTOR: { role_name: 'Director', title: 'Директор', permissions: {}, id: null },
  UNAUTHORIZED: { role_name: 'Unauthorized', title: 'Неавторизованный', permissions: {}, id: null }
};
