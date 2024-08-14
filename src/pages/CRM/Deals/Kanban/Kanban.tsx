import { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Empty } from 'common/ui';
import { IColumn, Task } from 'types/entities';
import { DraggableColumn } from './DraggableColumn';
import styles from './styles.module.scss';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface IProps {
  data: IColumn[];
  onChange?: (data: IColumn[]) => void;
  canDrag?: boolean;
}

export const Kanban: FC<IProps> = ({ data, onChange, canDrag = true }) => {
  const [columns, setColumns] = useState(data);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
  }, [data]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    checkScroll();
    if (container) {
      container.addEventListener('scroll', checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

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
    onChange && onChange(finalColumns);
  };

  const moveColumn = (dragIndex: number, hoverIndex: number) => {
    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(hoverIndex, 0, movedColumn);
    setColumns(updatedColumns);
    onChange && onChange(updatedColumns);
  };

  return (
    <>
      {data.length ? (
        <DndProvider backend={HTML5Backend}>
          <div className={styles.kanbanBoardWrapper}>
            <button className={cn(styles.navButton, styles.navButtonLeft)} onClick={() => scroll(-310)} disabled={!canScrollLeft}>
              &lt;
            </button>
            <div className={styles.kanbanBoard} ref={scrollContainerRef}>
              {columns.map((col, index) => (
                <DraggableColumn col={col} key={index} moveColumn={moveColumn} onDropTask={onCardDrop} index={index} canDrag={canDrag} />
              ))}
            </div>
            <button className={cn(styles.navButton, styles.navButtonRight)} onClick={() => scroll(310)} disabled={!canScrollRight}>
              &gt;
            </button>
          </div>
        </DndProvider>
      ) : (
        <Empty />
      )}
    </>
  );
};
