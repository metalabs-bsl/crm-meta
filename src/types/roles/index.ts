import type { UserRoleUnionType } from './roles';

export module IROLE {
  export type IRoles = {
    INTERN: UserRoleUnionType;
    MANAGER: UserRoleUnionType;
    SENIOR_MANAGER: UserRoleUnionType;
    DIRECTOR: UserRoleUnionType;
    UNAUTHORIZED: UserRoleUnionType;
  };
}

export const ROLES: IROLE.IRoles = {
  INTERN: 'Intern',
  MANAGER: 'Manager',
  SENIOR_MANAGER: 'Senior Manager',
  DIRECTOR: 'Director',
  UNAUTHORIZED: 'Unauthorized'
};
