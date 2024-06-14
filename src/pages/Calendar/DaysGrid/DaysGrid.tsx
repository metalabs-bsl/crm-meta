import React, { useState } from 'react';
import dayjs, { Dayjs, extend } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import cn from 'classnames';
import { Birthday, Note } from 'types/pages';
import { Icon } from 'common/ui';
import { BirthDayModal, Modal } from 'common/components';
import { NoteForm } from '../NoteForm';
import styles from './styles.module.scss';

extend(weekday);
extend(isoWeek);

interface DaysGridProps {
  currentMonth: Dayjs;
  notes: Note[];
  birthdays: Birthday[];
}

export const DaysGrid: React.FC<DaysGridProps> = ({ currentMonth, notes, birthdays }) => {
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [noteOpen, setNoteOpen] = useState<boolean>(false);
  const [currentBirthday, setCurrentBirthday] = useState<Birthday | null>(null);
  const [birthdayOpen, setBirthdayOpen] = useState<boolean>(false);

  const today = dayjs();
  const startOfMonth = currentMonth.startOf('month');
  const daysInMonth = currentMonth.daysInMonth();
  const startDay = startOfMonth.day();

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const days = Array.from({ length: daysInMonth }, (_, i) => startOfMonth.add(i, 'day'));

  const previousMonthDays = Array.from({ length: startDay === 0 ? 6 : startDay - 1 }, (_, i) =>
    startOfMonth.subtract(i + 1, 'day').date()
  ).reverse();

  const totalCells = previousMonthDays.length + daysInMonth;
  const remainingDaysCount = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  const nextMonthDays = Array.from({ length: remainingDaysCount }, (_, i) => startOfMonth.add(daysInMonth + i, 'day').date());

  const onCloseFormModal = () => {
    setCurrentNote(null);
    setNoteOpen(false);
  };

  const onNoteClick = (note: Note) => {
    setCurrentNote(note);
    setNoteOpen(true);
  };

  const onBirthdayClick = (data: Birthday) => {
    setCurrentBirthday(data);
    setBirthdayOpen(true);
  };

  const onCloseBirthdayModal = () => {
    setCurrentBirthday(null);
    setBirthdayOpen(false);
  };

  const editNote = () => {
    console.log('edit');
  };

  const deleteNote = () => {
    console.log('edit');
    onCloseFormModal();
  };

  const getNotesForDay = (day: Dayjs) => notes.filter((note) => dayjs(note.date).isSame(day, 'day'));
  const getBirthdaysForDay = (day: Dayjs) => birthdays.filter((birthday) => dayjs(birthday.date).isSame(day, 'day'));

  return (
    <div className={styles.calendar_grid}>
      <div className={styles.week_days}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.week_day}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days_grid}>
        {previousMonthDays.map((day, i) => (
          <div key={`prev-${i}`} className={cn(styles.day, styles.prev_next_month)}>
            <div>{day}</div>
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={cn(styles.day, {
              [styles.today]: day.isSame(today, 'day')
            })}
          >
            <div className={styles.round}>{day.format('D')}</div>
            <div className={styles.events_wrapper}>
              {getNotesForDay(day).map((note, index) => (
                <div key={index} className={styles.note} onClick={() => onNoteClick(note)}>
                  {note.title}
                </div>
              ))}
              {getBirthdaysForDay(day).map((birthday, index) => (
                <div key={index} className={styles.birthday} onClick={() => onBirthdayClick(birthday)}>
                  <Icon type='birthday' /> {birthday.name}
                </div>
              ))}
            </div>
          </div>
        ))}
        {nextMonthDays.map((day, i) => (
          <div key={`next-${i}`} className={cn(styles.day, styles.prev_next_month)}>
            <div>{day}</div>
          </div>
        ))}
      </div>
      {currentNote && (
        <Modal isOpen={noteOpen} onClose={onCloseFormModal}>
          <NoteForm deleteAction={deleteNote} editAction={editNote} formProps={currentNote} />
        </Modal>
      )}
      {currentBirthday && <BirthDayModal isOpen={birthdayOpen} data={currentBirthday} onCancel={onCloseBirthdayModal} />}
    </div>
  );
};

export default DaysGrid;
