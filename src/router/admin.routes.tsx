import { lazy } from 'react';
import { IRoute } from '../types/common';
import { ROLES } from '../types/roles';
import { adminLabels as labels, adminPath as paths } from '../types/routes/admin';

const NotFound = lazy(() => import('../pages/admin/NotFound'));
const CRM = lazy(() => import('../pages/admin/CRM'));
const Login = lazy(() => import('../pages/admin/Login'));

export const adminRoutes: IRoute[] = [
  {
    path: paths.notFound,
    label: labels.notFound,
    roles: [ROLES.ADMIN, ROLES.INTERN, ROLES.MANAGER, ROLES.SUPERVISOR],
    element: <NotFound />
  },
  {
    path: paths.main,
    label: labels.main,
    roles: [ROLES.ADMIN, ROLES.INTERN, ROLES.MANAGER, ROLES.SUPERVISOR, ROLES.UNAUTHORIZED],
    element: <CRM />
  },
  {
    path: paths.login,
    label: labels.login,
    roles: [ROLES.UNAUTHORIZED],
    element: <Login />
  }
];
