import { useState } from 'react';
import { Column } from './Column';
import { Task } from './Kanban.helper';
import styles from './styles.module.scss';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const columns = [
  { status: 'received', title: 'Поступили' },
  { status: 'processed', title: 'Взят в обработку' },
  { status: 'consideration', title: 'Рассмотрение' },
  { status: 'booking', title: 'Бронирование' },
  { status: 'bought', title: 'Уже купил' },
  { status: 'expensive', title: 'Дорого' },
  { status: 'wrongDates', title: 'Не те даты' },
  { status: 'changeMind', title: 'Передумал' },
  { status: 'noAnswer', title: 'Нет ответа' },
  { status: 'sale', title: 'Продажа' }
];

export const Kanban = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Task 1', status: 'received' },
    { id: 2, text: 'Task 2', status: 'processed' },
    { id: 3, text: 'Task 3', status: 'consideration' }
  ]);

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
