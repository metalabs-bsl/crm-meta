import { FC, useState } from 'react';
import { IColumn } from '../Deals.helper';
import { Column } from './Column';
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.kanbanBoard}>
        {columns.map((col, index) => (
          <Column key={index} col={col} onDrop={onCardDrop} />
        ))}
      </div>
    </DndProvider>
  );
};
