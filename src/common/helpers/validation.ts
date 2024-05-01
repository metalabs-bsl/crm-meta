import { IROLE } from 'types/roles';

export const validateRole = (access: IROLE.RoleObject[], user: IROLE.RoleObject): boolean => {
  return access.some((accessObject) => {
    return compareRoles(accessObject, user) && comparePermissions(accessObject, user);
  });
};

function compareRoles(access: IROLE.RoleObject, user: IROLE.RoleObject): boolean {
  return access.role === user.role;
}

function comparePermissions(access: IROLE.RoleObject, user: IROLE.RoleObject): boolean {
  return Object.entries(access.permissions).every(([name, value]) => {
    return user.permissions.hasOwnProperty(name) && user.permissions[name as IROLE.Permissions] === value;
  });
}
