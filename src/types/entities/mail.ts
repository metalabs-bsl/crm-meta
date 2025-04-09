import { IEmployee } from './employees';

export interface IAttachment {
  contentType: string;
  filename: string;
  id: string;
  size: 16674;
  content: {
    type: string;
    data: number[];
  };
}
export interface IMail {
  from: string;
  to: string;
  subject: string;
  text: string;
  messageId: string;
  type: string;
  attachments: IAttachment[];
  updated_at: string;
  id: string;
  created_at: string;
  hasBeenRead: boolean;
  isPinned: boolean;
  employee: IEmployee;
}

export interface IMailParams {
  type: string;
  search: string;
}

export interface IMailCounts {
  inboxCount: number;
  sentCount: number;
  unreadCount: number;
}

export interface ISendMail {
  to: string;
  subject: string;
  sign: string;
}

export interface ISetReadMessageParams {
  id: string;
  hasBeenRead: boolean;
}
export interface ISetPinMessageParams {
  id: string;
  isPinned: boolean;
}

export interface IForwardMessageParams {
  mail_id: string;
  mail_to: string;
}
