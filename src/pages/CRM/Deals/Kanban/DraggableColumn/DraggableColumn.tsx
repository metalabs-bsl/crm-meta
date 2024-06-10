import { FC } from 'react';
import { IColumn } from '../../Deals.helper';
import { Column } from '../Column';

import { useDrag, useDrop } from 'react-dnd';

interface DraggableColumnProps {
  col: IColumn;
  onDropTask: (id: number, newStatus: string) => void;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
}

export const DraggableColumn: FC<DraggableColumnProps> = ({ col, onDropTask, index, moveColumn }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveColumn(item.index, index);
        item.index = index;
      }
    }
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Column col={col} onDrop={onDropTask} />
    </div>
  );
};
