import { IColumn } from 'types/entities';
import { setBoard, setLoading } from './kanban.slice';

import { AppDispatch } from 'api';
import { sendMessage } from 'socket';

export const sendBoardUpdate = (board: IColumn[]) => (dispatch: AppDispatch) => {
  sendMessage('changeBoardKanban', board);
  dispatch(setBoard(board));
  dispatch(setLoading(false));
};

export const setKanbanBoard = (message: IColumn[]) => (dispatch: AppDispatch) => {
  dispatch(setBoard(message));
  dispatch(setLoading(false));
};
