import { ReactElement } from 'react';
import { UserRoleUnionType } from 'types/roles/roles';

export type IRoute = {
  path: string;
  label: string;
  element?: ReactElement;
  children?: IRoute[];
  roles: UserRoleUnionType[];
};
