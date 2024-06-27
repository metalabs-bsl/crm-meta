import { PayloadAction } from '@reduxjs/toolkit';
import { IUserInfoRes } from 'types/entities/login';
import { IROLE } from 'types/roles';

import { BG_TYPES } from 'types/enums';

export interface IBgState {
  bgType: BG_TYPES;
}

export type IBgAction = PayloadAction<BG_TYPES>;

export interface ISidebarState {
  isShowSidebar: boolean;
}

export type ISidebarAction = PayloadAction<boolean>;

export interface ILoginState {
  isAuthorized: boolean;
  role: IROLE.RoleObject;
  accessToken: null | string;
  userInfo: null | IUserInfoRes;
}
export type IAuthorizedAaction = PayloadAction<boolean>;
