import { FC } from 'react';
import { Loading } from 'common/ui';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { kanbanSelectors } from 'api/admin/kanban/kanban.selectors';
import { sendBoardUpdate } from 'api/admin/kanban/kanban.ws';
import { IColumn } from 'types/entities';
import { Kanban } from '../Kanban';

interface IProps {
  dataType: string;
}

export const KanbanChapter: FC<IProps> = ({ dataType }) => {
  const { board, boardAll, loading } = useAppSelector(kanbanSelectors.kanban);
  const dispatch = useAppDispatch();
  const isGeneral = dataType === '1';

  const handleChangeBoard = (data: IColumn[]) => {
    if (JSON.stringify(data) !== JSON.stringify(board)) {
      dispatch(sendBoardUpdate(data));
    }
  };

  return (
    <Loading isSpin={loading}>
      <Kanban canDrag={isGeneral} data={isGeneral ? board : boardAll} onChange={handleChangeBoard} />
    </Loading>
  );
};
