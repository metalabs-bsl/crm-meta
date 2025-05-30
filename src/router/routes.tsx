import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { IRoute } from '../types/common';
import { ROLES } from '../types/roles';
import { adminLabels as labels, adminPath as paths } from '../types/routes';

const NotFound = lazy(() => import('../pages/NotFound'));
const CRM = lazy(() => import('../pages/CRM'));
const Login = lazy(() => import('../pages/Login'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Settings = lazy(() => import('../pages/Settings'));
const Document = lazy(() => import('../pages/Document'));
const Mail = lazy(() => import('../pages/Mail'));
const MessageDetail = lazy(() => import('../pages/Mail/MessageDetail'));
const Report = lazy(() => import('../pages/Report'));
const BirthdaysToday = lazy(() => import('../pages/Calendar/DaysGrid/BirthdaysToday'));

export const mainRoutes: IRoute[] = [
  {
    path: paths.notFound,
    label: labels.notFound,
    roles: [ROLES.DIRECTOR, ROLES.INTERN, ROLES.MANAGER, ROLES.SENIOR_MANAGER],
    element: <NotFound />
  },
  {
    path: paths.root,
    label: '',
    roles: [ROLES.DIRECTOR, ROLES.INTERN, ROLES.MANAGER, ROLES.SENIOR_MANAGER],
    element: <Navigate to={'/crm/transactions'} />
  },
  {
    path: paths.crm,
    label: labels.crm,
    roles: [ROLES.DIRECTOR, ROLES.INTERN, ROLES.MANAGER, ROLES.SENIOR_MANAGER],
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
    roles: [ROLES.DIRECTOR, ROLES.INTERN, ROLES.MANAGER, ROLES.SENIOR_MANAGER],
    element: <Calendar />
  },
  {
    path: paths.birthdaysToday,
    label: labels.birthdaysToday,
    roles: [ROLES.DIRECTOR, ROLES.INTERN, ROLES.MANAGER, ROLES.SENIOR_MANAGER],
    element: <BirthdaysToday />
  },
  {
    path: paths.settings,
    label: labels.settings,
    roles: [ROLES.DIRECTOR, ROLES.SENIOR_MANAGER],
    element: <Settings />
  },
  {
    path: paths.document,
    label: labels.document,
    roles: [ROLES.DIRECTOR, ROLES.INTERN, ROLES.MANAGER, ROLES.SENIOR_MANAGER],
    element: <Document />
  },
  {
    path: paths.mail,
    label: labels.mail,
    roles: [ROLES.DIRECTOR, ROLES.INTERN, ROLES.MANAGER, ROLES.SENIOR_MANAGER],
    element: <Mail />
  },
  {
    path: paths.mailDetail,
    label: labels.mailDetail,
    roles: [ROLES.DIRECTOR, ROLES.INTERN, ROLES.MANAGER, ROLES.SENIOR_MANAGER],
    element: <MessageDetail />
  },
  {
    path: paths.report,
    label: labels.report,
    roles: [ROLES.DIRECTOR, ROLES.INTERN, ROLES.MANAGER, ROLES.SENIOR_MANAGER],
    element: <Report />
  }
];
