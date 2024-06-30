import { validateRole } from 'common/helpers';
import { IRoute } from 'types/common';
import { UserRoleUnionType } from 'types/roles/roles';
import { mainRoutes } from './routes';

const routes: IRoute[] = [...mainRoutes];

export const getRoutes = (user: UserRoleUnionType): IRoute[] => {
  return routes.filter((route) => validateRole(route.roles, user));
};
