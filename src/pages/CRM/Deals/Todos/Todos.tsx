import { FC } from 'react';
import { Loading } from 'common/ui';
import { IColumn } from 'types/entities';
import { Kanban } from '../Kanban';
interface IProps {
  data: IColumn[] | undefined;
  isFetching: boolean;
}

export const Todos: FC<IProps> = ({ data, isFetching = false }) => {
  return <Loading isSpin={isFetching}> {data && <Kanban canDrag={false} data={data} />}</Loading>;
};
