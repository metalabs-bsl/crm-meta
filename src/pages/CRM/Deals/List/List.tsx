import { Table } from 'common/ui/Table';
import { TableColumn } from 'common/ui/Table/Table';

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
  {
    key: 'dealStage',
    title: 'Стадия сделки',
    isEdit: {
      value: true,
      component: 'select'
    }
  },
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

const data = [
  {
    name: 'MetaLabs',
    client: 'Евгений',
    dealStage: 'Стадия 1',
    tasks: 'Ограничение доступа посторонним пользователям',
    amount: '1000 USD',
    responsible: 'Almaz'
  },
  {
    name: 'AnotherItem',
    client: 'AnotherClient',
    dealStage: 'AnotherStage',
    tasks: 'AnotherTasks',
    amount: '2000 USD',
    responsible: 'AnotherResponsible'
  }
];

export const List = () => {
  return <Table data={data} columns={columns} />;
};
