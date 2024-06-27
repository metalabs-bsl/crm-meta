import { FC, useEffect, useState } from 'react';
import { IColumn, Task } from 'types/entities';
import { DraggableColumn } from './DraggableColumn';
import styles from './styles.module.scss';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface IProps {
  data: IColumn[];
  onChange: (data: IColumn[]) => void;
}

export const Kanban: FC<IProps> = ({ data, onChange }) => {
  const [columns, setColumns] = useState(data);

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
  }, [data]);

  const onCardDrop = (id: string, newColIndex: number, targetIndex: number) => {
    let movedCard: Task | undefined;

    const updatedColumns = columns.map((column) => {
      if (column.leads.some((card) => card?.id === id)) {
        movedCard = column.leads.find((card) => card?.id === id);
      }
      return {
        ...column,
        leads: column.leads.filter((card) => card?.id !== id)
      };
    });

    const finalColumns = updatedColumns.map((column, index) => {
      if (index === newColIndex) {
        const findCard = column.leads.find((card) => card?.id === id);
        if (!findCard && movedCard) {
          const updatedCards = [...column.leads];
          updatedCards.splice(targetIndex, 0, { ...movedCard });
          return { ...column, leads: updatedCards };
        } else if (findCard) {
          const updatedCards = column.leads.filter((card) => card?.id !== id);
          updatedCards.splice(targetIndex, 0, findCard);
          return { ...column, leads: updatedCards };
        }
      }
      return column;
    });

    setColumns(finalColumns);
    onChange(finalColumns);
  };

  const moveColumn = (dragIndex: number, hoverIndex: number) => {
    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(hoverIndex, 0, movedColumn);
    setColumns(updatedColumns);
    onChange(updatedColumns);
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
