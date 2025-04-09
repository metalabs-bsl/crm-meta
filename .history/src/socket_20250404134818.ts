import { TableRow } from 'pages/CRM/Deals/List/types/types';
import { setConnected } from 'api/admin/kanban/kanban.slice';
import { setKanbanAllBoard, setKanbanBoard, setOnlineList } from 'api/admin/kanban/kanban.ws';
import { setListBoard, setListBoardAll } from 'api/admin/list/list.slice';
import { IColumn } from 'types/entities';

import { AppDispatch, RootState } from 'api';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_WS_BASE_URL || '';
const WHATSAPP_SOCKET_URL = process.env.REACT_APP_WHATSAPP_WS_BASE_URL || '';
let socket: Socket | null = null;
let whatsappSocket: Socket | null = null;
let whatsappMessageCallback: ((message: string) => void) | null = null;

export const connectSocket = (accessToken: string | null) => {
  if (!socket && accessToken) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
        
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

    socket.connect();
  }
};

export const connectWhatsAppSocket = () => {
  if (!whatsappSocket) {
    whatsappSocket = io(WHATSAPP_SOCKET_URL, {
      autoConnect: true
    });

    whatsappSocket.on('connect', () => {
      console.log('Connected to WhatsApp WebSocket server');
    });

    whatsappSocket.on('disconnect', () => {
      console.log('Disconnected from WhatsApp WebSocket server');
    });

    whatsappSocket.on('whatsapp', (message: string) => {
      if (whatsappMessageCallback) {
        whatsappMessageCallback(message);
      }
    });
  }
};

export const disconnectWhatsAppSocket = () => {
  if (whatsappSocket?.connected) {
    whatsappSocket.disconnect();
    whatsappSocket = null;
  }
};

export const registerWhatsAppMessageHandler = (callback: (message: string) => void) => {
  whatsappMessageCallback = callback;
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

    socket?.on('boardKanbanAll', (message: IColumn[]) => {
      dispatch(setKanbanAllBoard(message));
    });

    socket?.on('boardList', (message: TableRow) => {
      dispatch(setListBoard(message));
    });

    socket?.on('boardListAll', (message: TableRow) => {
      dispatch(setListBoardAll(message));
    });

    socket?.on('online', (message) => {
      dispatch(setOnlineList(message));
    });
  } else {
    console.error('Access token is not available, cannot initialize socket.');
  }
};
