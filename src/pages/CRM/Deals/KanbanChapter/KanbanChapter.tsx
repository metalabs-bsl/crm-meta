import { Loading } from 'common/ui';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { kanbanSelectors } from 'api/admin/kanban/kanban.selectors';
import { sendBoardUpdate } from 'api/admin/kanban/kanban.ws';
import { IColumn } from 'types/entities';
import { Kanban } from '../Kanban';

export const KanbanChapter = () => {
  const { board: kanbanBoard, loading } = useAppSelector(kanbanSelectors.kanban);
  const dispatch = useAppDispatch();

  const handleChangeBoard = (data: IColumn[]) => {
    if (JSON.stringify(data) !== JSON.stringify(kanbanBoard)) {
      dispatch(sendBoardUpdate(data));
    }
  };

  return (
    <Loading isSpin={loading}>
      <Kanban data={kanbanBoard} onChange={handleChangeBoard} />
    </Loading>
  );
};
