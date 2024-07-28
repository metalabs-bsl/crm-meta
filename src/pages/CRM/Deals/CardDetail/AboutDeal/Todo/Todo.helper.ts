import { IIconType } from 'types/common';
import { IComment, ICreateReminderParams } from 'types/entities';

export interface TodoItem {
  created_at: string;
  date_to_finish: string;
  text: string;
  id: string;
  reminder_text: string;
  status: number;
  updated_at: string;
}

export type ItemCardType = 'comments' | 'todos';

export interface IDataBlock {
  icon: IIconType;
  blockTitle: string;
  todoData?: ICreateReminderParams[];
  commentData?: IComment[];
  cardsType: ItemCardType;
}
