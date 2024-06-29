import { UserRoleUnionType } from 'types/roles/roles';

export const validateRole = (access: UserRoleUnionType[], user: UserRoleUnionType): boolean => {
  return access.some((accessObject) => {
    return compareRoles(accessObject, user);
  });
};

function compareRoles(access: UserRoleUnionType, user: UserRoleUnionType): boolean {
  return access === user;
}
