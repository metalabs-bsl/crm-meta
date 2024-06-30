import { FC } from 'react';
import { ListTable } from 'pages/CRM/Deals/List/ListTable';
import { TableColumn } from 'pages/CRM/Deals/List/ListTable/ListTable';
import { Loading } from 'common/ui';
import { useAppSelector } from 'common/hooks';
import { listSelectors } from 'api/admin/list/list.selectors';

const columns: TableColumn[] = [
  {
    key: 'lead_name',
    title: 'Наименование',
    isEdit: {
      value: true,
      component: 'input'
    }
  },
  { key: 'customer', title: 'Клиент' },
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

interface IListProps {
  dataType: string;
}

export const List: FC<IListProps> = ({ dataType }) => {
  const { list, listAll, loading } = useAppSelector(listSelectors.list);

  console.log(dataType, dataType === '1' ? list : listAll);

  return (
    <Loading isSpin={loading}>
      <ListTable data={dataType === '1' ? list : listAll} columns={columns} />
    </Loading>
  );
};
