export type IChangeItemStatus = 'history-edit' | 'history-todo' | 'history-accounts' | 'history-comment' | 'history-deal-create';

export interface Change {
  description: string;
  timestamp: string;
  status: IChangeItemStatus;
}

export const history: Record<string, Change[]> = {
  '2024-05-28': [
    { description: 'Стадия изменена', timestamp: '10:00', status: 'history-edit' },
    { description: 'Наименование', timestamp: '12:00', status: 'history-edit' }
  ],
  '2024-05-15': [{ description: 'Ограничить права прищелцев на планете Пандора.', timestamp: '11:11', status: 'history-todo' }],
  '2024-05-12': [{ description: 'Инопланетянин выслал счет за полет... ', timestamp: '11:11', status: 'history-accounts' }],
  '2024-05-09': [{ description: 'Пришельцы атакуют!', timestamp: '11:11', status: 'history-comment' }],
  '2024-05-08': [{ description: 'MetaLabs', timestamp: '14:00', status: 'history-deal-create' }]
};
