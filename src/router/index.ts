import { validateRole } from 'common/helpers';
import { IRoute } from 'types/common';
import { IROLE } from 'types/roles';
import { mainRoutes } from './routes';

const routes: IRoute[] = [...mainRoutes];

export const getRoutes = (user: IROLE.RoleObject): IRoute[] => {
  return routes.filter((route) => validateRole(route.roles, user));
};
