import { FC } from 'react';
import { IColumn } from 'types/entities';
import { Column } from '../Column';

import { useDrag, useDrop } from 'react-dnd';

interface DraggableColumnProps {
  col: IColumn;
  onDropTask: (id: string, targetColIndex: number, targetIndex: number) => void;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  canDrag: boolean;
}

export const DraggableColumn: FC<DraggableColumnProps> = ({ col, onDropTask, index, moveColumn, canDrag }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN',
    canDrag,
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
      <Column col={col} onDrop={onDropTask} index={index} canDrag={canDrag} />
    </div>
  );
};
