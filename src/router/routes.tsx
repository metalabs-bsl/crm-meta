import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { IRoute } from '../types/common';
import { ROLES } from '../types/roles';
import { adminLabels as labels, adminPath as paths } from '../types/routes';

const NotFound = lazy(() => import('../pages/NotFound'));
const CRM = lazy(() => import('../pages/CRM'));
const Login = lazy(() => import('../pages/Login'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Document = lazy(() => import('../pages/Document'));
const Mail = lazy(() => import('../pages/Mail'));

export const mainRoutes: IRoute[] = [
  {
    path: paths.notFound,
    label: labels.notFound,
    roles: [ROLES.ADMIN, ROLES.INTERN, ROLES.MANAGER, ROLES.SUPERVISOR],
    element: <NotFound />
  },
  {
    path: paths.root,
    label: '',
    roles: [ROLES.ADMIN, ROLES.INTERN, ROLES.MANAGER, ROLES.SUPERVISOR],
    element: <Navigate to={'/crm/transactions'} />
  },
  {
    path: paths.crm,
    label: labels.crm,
    roles: [ROLES.ADMIN, ROLES.INTERN, ROLES.MANAGER, ROLES.SUPERVISOR, ROLES.UNAUTHORIZED],
    element: <CRM />
  },
  {
    path: paths.login,
    label: labels.login,
    roles: [ROLES.UNAUTHORIZED],
    element: <Login />
  },
  {
    path: paths.calendar,
    label: labels.calendar,
    roles: [ROLES.ADMIN, ROLES.INTERN, ROLES.MANAGER, ROLES.SUPERVISOR],
    element: <Calendar />
  },
  {
    path: paths.document,
    label: labels.document,
    roles: [ROLES.ADMIN, ROLES.INTERN, ROLES.MANAGER, ROLES.SUPERVISOR],
    element: <Document />
  },
  {
    path: paths.mail,
    label: labels.mail,
    roles: [ROLES.ADMIN, ROLES.INTERN, ROLES.MANAGER, ROLES.SUPERVISOR],
    element: <Mail />
  }
];
