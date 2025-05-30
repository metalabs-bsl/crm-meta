import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastOptions, TypeOptions } from 'react-toastify';

type MessageType = 'info' | 'success' | 'warning' | 'error';

export const useNotify = () => {
  const notify = (message: string, type: MessageType = 'info') => {
    const options: ToastOptions = { type: type as TypeOptions };
    toast(message, options);
  };

  return notify;
};
