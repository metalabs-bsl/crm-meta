import { FC, useEffect, useState } from 'react';
import { IColumn, Task } from '../Deals.helper';
import { DraggableColumn } from './DraggableColumn';
import styles from './styles.module.scss';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface IProps {
  data: IColumn[];
}

export const Kanban: FC<IProps> = ({ data }) => {
  const [columns, setColumns] = useState(data);

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
  }, [data]);

  const onCardDrop = (id: number, newStatus: string, targetIndex: number) => {
    let movedCard: Task | undefined;

    const updatedColumns = columns.map((column) => {
      if (column.cards.some((card) => card?.id === id)) {
        movedCard = column.cards.find((card) => card?.id === id);
      }
      return {
        ...column,
        cards: column.cards.filter((card) => card?.id !== id)
      };
    });

    const finalColumns = updatedColumns.map((column) => {
      if (column.status === newStatus) {
        const findCard = column.cards.find((card) => card?.id === id);
        if (!findCard && movedCard) {
          const updatedCards = [...column.cards];
          updatedCards.splice(targetIndex, 0, { ...movedCard, status: newStatus });
          return { ...column, cards: updatedCards };
        } else if (findCard) {
          const updatedCards = column.cards.filter((card) => card?.id !== id);
          updatedCards.splice(targetIndex, 0, findCard);
          return { ...column, cards: updatedCards };
        }
      }
      return column;
    });

    setColumns(finalColumns);
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
