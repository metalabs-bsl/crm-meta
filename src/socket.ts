import { setConnected, setLoading } from 'api/admin/kanban/kanban.slice';
import { setKanbanBoard } from 'api/admin/kanban/kanban.ws';
import { IColumn } from 'types/entities';

import { AppDispatch } from 'api';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_WS_BASE_URL || '';
const accessToken = localStorage.getItem('accessToken');

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  extraHeaders: {
    Authorization: `Bearer ${accessToken}`
  }
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export const sendMessage = (event: string, data: IColumn[]) => {
  if (socket.connected) {
    socket.emit(event, data);
  } else {
    console.error('Socket is not connected');
  }
};

export const initializeSocket = () => (dispatch: AppDispatch) => {
  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
    dispatch(setConnected(true));
  });

  socket.on('disconnect', () => {
    dispatch(setConnected(false));
    console.log('Disconnected from WebSocket server');
  });

  socket.on('boardKanban', (message: IColumn[]) => {
    dispatch(setKanbanBoard(message));
  });

  connectSocket();
  dispatch(setLoading(true));
};
