import { IIconType } from 'types/common';

interface IOption {
  title: string;
  value: string;
}

interface IItem {
  label?: string;
  value?: string;
  type?: string;
  icon?: IIconType;
  options?: IOption[];
  items?: IItem[];
}

export const FormItems: IItem[] = [
  {
    label: 'Наименование',
    value: 'MetaLabs',
    type: 'text'
  },
  {
    label: 'Клиент',
    value: 'Азат',
    type: 'text'
  },
  {
    label: 'Номер телефона',
    value: '+996500500500',
    type: 'text'
  },
  {
    label: 'Город проживания',
    value: 'Бишкек',
    type: 'text'
  },
  {
    label: 'Источник',
    value: 'Написал в WhatsApp',
    type: 'select',
    options: [
      {
        title: 'Звонок',
        value: 'call'
      },
      {
        title: 'Написал в WhatsApp',
        value: 'whatsApp'
      },
      {
        title: 'По рекомендации',
        value: 'recommendation'
      },
      {
        title: 'Постоянный клиент',
        value: 'regular-customer'
      },
      {
        title: 'Офис',
        value: 'office'
      }
    ]
  },
  {
    items: [
      {
        label: 'Дата рождения клиента',
        value: '2024-05-08T11:11',
        type: 'datetime-local'
      },
      {
        label: 'Дата создания сделки',
        value: '2024-05-08T11:11',
        type: 'datetime-local'
      }
    ]
  },
  {
    label: 'Ответственный',
    value: 'Азатов Азат',
    type: 'text',
    icon: 'userIcon'
  }
];
