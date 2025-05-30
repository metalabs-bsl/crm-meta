import { TableRow } from 'pages/CRM/Deals/List/types/types';
import { setListBoard, setListBoardAll, setLoading } from './list.slice';

import { AppDispatch } from 'api';

export const setListTable = (message: TableRow) => (dispatch: AppDispatch) => {
  dispatch(setListBoard(message));
  dispatch(setLoading(false));
};

export const setListTableAll = (message: TableRow) => (dispatch: AppDispatch) => {
  dispatch(setListBoardAll(message));
  dispatch(setLoading(false));
};

export const setUpdateTable = (message: TableRow) => (dispatch: AppDispatch) => {
  dispatch(setListBoard(message));
  dispatch(setLoading(false));
};
