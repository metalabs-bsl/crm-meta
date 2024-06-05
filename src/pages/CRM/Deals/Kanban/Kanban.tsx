import { FC, useEffect, useState } from 'react';
import { Column } from './Column';
import { IColumn, Task } from './Kanban.helper';
import styles from './styles.module.scss';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface IProps {
  data: Task[];
  columns: IColumn[];
}

export const Kanban: FC<IProps> = ({ data, columns }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const handleDrop = (id: number, newStatus: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.status = newStatus;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.kanbanBoard}>
        {columns.map((col, index) => (
          <Column key={index} col={col} tasks={tasks.filter((task) => task.status === col.status)} onDrop={handleDrop} />
        ))}
      </div>
    </DndProvider>
  );
};
