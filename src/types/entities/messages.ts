export interface IMessageResponse {
  id: number;
  isSender: boolean;
  message?: string;
  hasMedia: boolean;
  fileId: number | null;
  fileType?: string | null;
  timestamp: string;
}
