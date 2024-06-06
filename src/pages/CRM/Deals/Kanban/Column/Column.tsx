import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { DeleteModal, DropdownModal, FilterByDate, Modal } from 'common/components';
import { Card } from '../Card';
import { IColumn } from '../Kanban.helper';
import { ColumnCreateForm } from './ColumnCreateForm';
import styles from './styles.module.scss';

import { useDrop } from 'react-dnd';
import { BUTTON_TYPES } from 'types/enums';

interface ColumnProps {
  col: IColumn;
  tasks: { id: number; text: string }[];
  onDrop: (id: number, newStatus: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ col, tasks, onDrop }) => {
  const { status, title, color } = col;
  const [openColumnModal, setOpenColumnModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const filterRef = useRef(null);
  const isSaleColumn = status === 'sale';
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item: { id: number }) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  const onCloseColumnModal = () => {
    setOpenColumnModal(false);
  };

  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const onColumnDelete = () => {
    console.log('колонка удалена');
  };

  const onClickFilterModal = () => {
    setOpenFilterModal(!openFilterModal);
  };

  const onFilterChange = (start: string, end: string) => {
    console.log({ start, end });
  };

  return (
    <div className={cn(styles.column, { [styles.isOver]: isOver })} ref={drop}>
      <div className={styles.titleBlock}>
        <div className={cn(styles.roundIcon, styles[color])} />
        <span className={styles.title}>{title}</span>
        <span className={styles.count}>(1)</span>
        <div className={styles.actionBlock} style={{ display: isSaleColumn && openFilterModal ? 'flex' : '' }}>
          {isSaleColumn && (
            <div ref={filterRef} onClick={onClickFilterModal} className={styles.filter}>
              <Icon type='calendar-outline' />
            </div>
          )}
          <Icon type='delete' alt='delete' onClick={() => setOpenDeleteModal(true)} />
          <div className={styles.plus}>
            <Icon type='plus-icon' alt='plus' onClick={() => setOpenColumnModal(true)} />
          </div>
        </div>
      </div>
      {isSaleColumn && <span className={styles.totalSum}>200.000$</span>}
      <div className={styles.createBtn} onClick={() => console.log('click plus')}>
        <Icon type='plus-icon' alt='plus' />
      </div>
      <div className={styles.cardsContainer}>
        {tasks.map((task) => (
          <Card key={task.id} id={task.id} text={task.text} />
        ))}
      </div>
      <Modal
        isOpen={openColumnModal}
        onClose={onCloseColumnModal}
        leftBtnText='сохранить'
        leftBtnStyle={BUTTON_TYPES.YELLOW}
        rightBtnText='отменить'
        rightBtnStyle={BUTTON_TYPES.Link_BLACK}
        rightBtnAction={onCloseColumnModal}
      >
        <ColumnCreateForm />
      </Modal>
      <DeleteModal
        isOpen={openDeleteModal}
        onCancel={onCloseDeleteModal}
        text={`Вы уверены, что хотите удалить колонку "${title}"?`}
        onDelete={onColumnDelete}
      />
      {isSaleColumn && (
        <DropdownModal targetRef={filterRef} onClose={onClickFilterModal} isOpen={openFilterModal}>
          <FilterByDate onFilterChange={onFilterChange} />
        </DropdownModal>
      )}
    </div>
  );
};
