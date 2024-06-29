import { PayloadAction } from '@reduxjs/toolkit';
import { IUserInfoRes } from 'types/entities';
import { IROLE } from 'types/roles';

import { BG_TYPES } from 'types/enums';

export interface IBgState {
  bgType: BG_TYPES;
  userInfo: null | IUserInfoRes;
  role: IROLE.RoleObject;
}

export type IBgAction = PayloadAction<BG_TYPES>;

export interface ISidebarState {
  isShowSidebar: boolean;
  isOpenEdgeModal: boolean;
  isNewDeal: boolean;
}

export type ISidebarAction = PayloadAction<boolean>;

export interface ILoginState {
  isAuthorized: boolean;
  accessToken: null | string;
}
export type IAuthorizedAaction = PayloadAction<boolean>;
