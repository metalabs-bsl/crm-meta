import { FC, useState } from 'react';
import { IColumn } from 'types/entities';
import { Kanban } from '../Kanban';
interface IProps {
  data: IColumn[];
}

export const Todos: FC<IProps> = ({ data }) => {
  const [changeTodosData, setChangeTodosData] = useState<IColumn[]>(data);
  return <Kanban data={changeTodosData} onChange={setChangeTodosData} />;
};
