import { FC } from 'react';
import { Loading } from 'common/ui';
import { useAppSelector } from 'common/hooks';
import { listSelectors } from 'api/admin/list/list.selectors';
import ListTable from './ListTable/ListTable';

interface IListProps {
  dataType: string;
}

export const List: FC<IListProps> = ({ dataType }) => {
  const { list, listAll, loading } = useAppSelector(listSelectors.list);

  console.log(dataType, dataType === '1' ? list : listAll);

  return (
    <Loading isSpin={loading}>
      <ListTable columns={[]} data={dataType === '1' ? list : listAll} />
    </Loading>
  );
};
