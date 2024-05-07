import { PayloadAction } from '@reduxjs/toolkit';
import { IROLE } from 'types/roles';

export interface ISidebarState {
  isShowSidebar: boolean;
}

export type ISidebarAction = PayloadAction<boolean>;

export interface ILoginState {
  isAuthorized: boolean;
  role: IROLE.RoleObject;
}
export type IAuthorizedAaction = PayloadAction<boolean>;
