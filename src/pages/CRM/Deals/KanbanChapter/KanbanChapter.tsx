import { FC } from 'react';
import { Loading } from 'common/ui';
import { useAppDispatch, useAppSelector, useNotify } from 'common/hooks';
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
  const notify = useNotify();

  console.log('board', board);

  const handleChangeBoard = (data: IColumn[]) => {
    if (JSON.stringify(data) !== JSON.stringify(board)) {
      if (dataType === '1') {
        dispatch(sendBoardUpdate(data));
      } else {
        notify('В разделе "Общие сделки" переносимые лиды не сохраняются ');
      }
    }
  };

  return (
    <Loading isSpin={loading}>
      <Kanban data={dataType === '1' ? board : boardAll} onChange={handleChangeBoard} />
    </Loading>
  );
};
