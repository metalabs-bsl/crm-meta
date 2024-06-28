import { setConnected } from 'api/admin/kanban/kanban.slice';
import { setKanbanBoard } from 'api/admin/kanban/kanban.ws';
import { IColumn } from 'types/entities';

import { AppDispatch, RootState } from 'api';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_WS_BASE_URL || '';
let socket: Socket | null = null;

export const connectSocket = (accessToken: string | null) => {
  if (!socket && accessToken) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      // Add logic for handling connection if needed
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      // Add logic for handling disconnection if needed
    });

    socket.on('boardKanban', (message: IColumn[]) => {
      console.log('Received boardKanban event:', message);
      // Add logic for handling received data if needed
    });

    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
  }
};

export const sendMessage = (event: string, data: IColumn[]) => {
  if (socket?.connected) {
    socket.emit(event, data);
  } else {
    console.error('Socket is not connected');
  }
};

export const initializeSocket = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const accessToken = getState().login.accessToken;

  if (accessToken) {
    connectSocket(accessToken);

    // Example of dispatching actions to update Redux state
    dispatch(setConnected(socket?.connected || false));
    socket?.on('boardKanban', (message: IColumn[]) => {
      dispatch(setKanbanBoard(message));
    });
  } else {
    console.error('Access token is not available, cannot initialize socket.');
  }
};
