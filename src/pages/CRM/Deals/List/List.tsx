import { Table } from 'common/ui/Table';
import { TableColumn, TableRow } from 'common/ui/Table/Table';

const columns: TableColumn[] = [
  {
    key: 'name',
    title: 'Наименование',
    isEdit: {
      value: true,
      component: 'input'
    }
  },
  { key: 'client', title: 'Клиент' },
  { key: 'dealStage', title: 'Стадия сделки', isEdit: { value: true, component: 'miniprogress' } },
  {
    key: 'tasks',
    title: 'Дела'
  },
  {
    key: 'amount',
    title: 'Сумма/валюта'
  },
  {
    key: 'responsible',
    title: 'Ответственный',
    isEdit: {
      value: true,
      component: 'select'
    }
  }
];

const data: TableRow[] = [
  {
    name: 'MetaLabs',
    client: 'Евгений',
    dealStage: 'received',
    tasks: 'Ограничение доступа посторонним пользователям ',
    amount: '1000 USD',
    responsible: 'Almaz',
    birthday: '1992-06-30T00:00',
    phoneNumber: '+996220790552',
    city: 'Бишкек',
    source: 'Написал в WhatsApp',
    date: '2024-06-30T00:00'
  },
  {
    name: 'AnotherItem',
    client: 'AnotherClient',
    dealStage: 'processed',
    tasks: 'AnotherTasks',
    amount: '2000 USD',
    responsible: 'AnotherResponsible',
    birthday: '2000-06-24T00:00',
    phoneNumber: '+996552770140',
    city: 'Бишкек',
    source: 'Написал в WhatsApp',
    date: '2024-06-30T00:00'
  }
];

export const List = () => {
  return <Table data={data} columns={columns} />;
};
