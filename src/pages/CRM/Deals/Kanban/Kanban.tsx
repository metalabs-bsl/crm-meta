import { FC, useState } from 'react';
import { IColumn } from '../Deals.helper';
import { DraggableColumn } from './DraggableColumn';
import styles from './styles.module.scss';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface IProps {
  data: IColumn[];
}

export const Kanban: FC<IProps> = ({ data }) => {
  const [columns, setColumns] = useState(data);

  const onCardDrop = (id: number, newStatus: string) => {
    const updatedColumns = columns.map((column) => {
      if (column.status === newStatus) {
        const findCard = column.cards.find((card) => card.id === id);
        if (!findCard) {
          const updatedCards = [...column.cards, { id, text: `Task ${id}`, status: newStatus }];
          return { ...column, cards: updatedCards };
        }
        return column;
      } else {
        const updatedCards = column.cards.filter((card) => card.id !== id);
        return { ...column, cards: updatedCards };
      }
    });
    setColumns(updatedColumns);
  };

  const moveColumn = (dragIndex: number, hoverIndex: number) => {
    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(hoverIndex, 0, movedColumn);
    setColumns(updatedColumns);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.kanbanBoard}>
        {columns.map((col, index) => (
          <DraggableColumn col={col} key={index} moveColumn={moveColumn} onDropTask={onCardDrop} index={index} />
        ))}
      </div>
    </DndProvider>
  );
};
