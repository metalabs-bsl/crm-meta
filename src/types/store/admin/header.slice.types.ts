import { PayloadAction } from '@reduxjs/toolkit';
import { IUserInfoRes } from 'types/entities';
import { UserRoleUnionType } from 'types/roles/roles';

import { BG_TYPES } from 'types/enums';

export interface IBgState {
  bgType: BG_TYPES;
  userInfo: null | IUserInfoRes;
  role: UserRoleUnionType;
}

export type IBgAction = PayloadAction<BG_TYPES>;

export interface ISidebarState {
  isShowSidebar: boolean;
  isOpenEdgeModal: boolean;
  isNewDeal: boolean;
  column_id: string;
}

export type ISidebarAction = PayloadAction<boolean>;

export interface ILoginState {
  isAuthorized: boolean;
  accessToken: null | string;
}
export type IAuthorizedAaction = PayloadAction<boolean>;
