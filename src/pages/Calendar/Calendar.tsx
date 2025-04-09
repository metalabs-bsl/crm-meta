import { FC, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Button, Loading } from 'common/ui';
import { Modal } from 'common/components';
import { useGetCalendarDataQuery } from 'api/admin/calendar/calendar.api';
import { DaysGrid } from './DaysGrid';
import { MonthSwitcher } from './MonthSwitcher';
import { NoteForm } from './NoteForm';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const Calendar: FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [noteOpen, setNoteOpen] = useState<boolean>(false);
  const { data, isFetching } = useGetCalendarDataQuery();

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev.add(1, 'month'));
  };

  const onCloseFormModal = () => setNoteOpen(false);

  return (
    <Loading isSpin={isFetching}>
      <div className={styles.calendar}>
        <div className={styles.calendar_head}>
          <MonthSwitcher currentMonth={currentMonth} onPreviousMonth={handlePreviousMonth} onNextMonth={handleNextMonth} />
          <Button styleType={BUTTON_TYPES.YELLOW} text='добавить заметку' onClick={() => setNoteOpen(true)} />
        </div>
        <DaysGrid currentMonth={currentMonth} birthdays={data?.birthdays || []} notes={data?.notes || []} />
        <Modal isOpen={noteOpen} onClose={onCloseFormModal}>
          <NoteForm onCloseModal={onCloseFormModal} />
        </Modal>
      </div>
    </Loading>
  );
};
