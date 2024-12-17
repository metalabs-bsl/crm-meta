import { FC, ReactNode, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { BirthDayModal, BreakModal, GreetingsModal, Modal } from 'common/components';
import { NoteModal } from 'common/components/NoteModal';
import { useAppSelector } from 'common/hooks';
import { useGetCalendarDataQuery } from 'api/admin/calendar/calendar.api';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { useGetWorkTimeInfoQuery } from 'api/admin/workTime/workTime.api';
import { Birthday, Note } from 'types/entities';

import { NOTIFICATION_COMPONENTS } from 'types/enums';

interface IProps {
  children: ReactNode;
}

export const NotificationLayout: FC<IProps> = ({ children }) => {
  const { data: workTimeData } = useGetWorkTimeInfoQuery();
  const { data: calendarData } = useGetCalendarDataQuery();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [prevModal, setPrevModal] = useState<boolean>(false);
  const [isPreved, setIsPreved] = useState<boolean>(false);
  const [activeNotification, setActiveNotification] = useState<NOTIFICATION_COMPONENTS | null>(null);
  const [isBreakNotified, setIsBreakNotified] = useState<boolean>(false);
  const [birthdayData, setBirthdayData] = useState<Birthday | undefined>(undefined);
  const [noteData, setNoteData] = useState<Note | undefined>(undefined);
  const { userInfo } = useAppSelector(employeesSelectors.employees);

  const closeNotificationModal = () => {
    setIsModalOpen(false);
    setActiveNotification(null);
    setIsPreved(false);
    if (activeNotification === NOTIFICATION_COMPONENTS.BREAK) {
      setIsBreakNotified(true);
    }
  };

  const openNotificationModal = (type: NOTIFICATION_COMPONENTS) => {
    setActiveNotification(type);
    setIsModalOpen(true);
  };

  const offsets = {
    2: 0, // Во время начала
    3: 5, // За 5 минут
    4: 15, // За 15 минут
    5: 30, // За 30 минут
    6: 60, // За час
    7: 120, // За 2 часа
    8: 1440, // За день
    9: 2880, // За 2 дня
    10: 10080 // За неделю
  } as const;

  const getReminderOffset = (reminderType: number): number => {
    return offsets[reminderType as keyof typeof offsets] || 0;
  };

  useEffect(() => {
    if (userInfo) {
      setPrevModal(true);
    }
  }, [userInfo]);

  useEffect(() => {
    if (calendarData) {
      calendarData.notes.forEach((note) => {
        const eventTime = dayjs(note.date).utc().local(); // Преобразуем событие в локальное время
        const reminderMinutes = getReminderOffset(note.reminderTypes[0]);
        const reminderTime = eventTime.subtract(reminderMinutes, 'minute'); // Рассчитываем время напоминания
        const now = dayjs(); // Текущее локальное время

        console.log('Event Time (Local):', eventTime.format('YYYY-MM-DD HH:mm:ss Z'));
        console.log('Reminder Time (Local):', reminderTime.format('YYYY-MM-DD HH:mm:ss Z'));
        console.log('Now:', now.format('YYYY-MM-DD HH:mm:ss Z'));
        if (reminderTime.isSame(now, 'minute')) {
          console.log('vot modalka');
          new Audio('/notification.mp3').play();
          setNoteData(note);
          openNotificationModal(NOTIFICATION_COMPONENTS.NOTE);
        }
      });
      console.log(calendarData);
      const today = dayjs().startOf('day').format('MM-DD');
      const birthdayToday = calendarData.birthdays.find((birthday) => dayjs(birthday.date).utc().startOf('day').format('MM-DD') === today);
      if (birthdayToday) {
        setTimeout(() => {
          new Audio('/notification.mp3').play();
          setBirthdayData(birthdayToday);
          openNotificationModal(NOTIFICATION_COMPONENTS.BIRTHDAY);
        }, 5000);
      }
    }
  }, [calendarData]);

  useEffect(() => {
    if (userInfo && isPreved) {
      openNotificationModal(NOTIFICATION_COMPONENTS.NOTE);
    }
  }, [isPreved, userInfo]);

  const closePrevModal = () => {
    setPrevModal(false);
    setIsPreved(false);
  };

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (workTimeData?.break_started && !workTimeData.break_ended) {
      console.log(workTimeData);
      const updateCurrentPauseTime = () => {
        const now = dayjs().utc(true);
        const start = dayjs(workTimeData.break_started);
        const breakEndTime = start.add(1, 'hour');
        const remainingDuration = dayjs.duration(breakEndTime.diff(now));
        if (remainingDuration.asMinutes() <= 59 && !isBreakNotified) {
          console.log('Triggering break notification');
          openNotificationModal(NOTIFICATION_COMPONENTS.BREAK);
          setIsBreakNotified(true);
          new Audio('/notification.mp3').play();
        }
      };
      updateCurrentPauseTime();
      intervalId = setInterval(updateCurrentPauseTime, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [workTimeData, isBreakNotified]);
  const getNotificationComponents = () => {
    const modals: Record<NOTIFICATION_COMPONENTS, ReactNode> = {
      [NOTIFICATION_COMPONENTS.BIRTHDAY]: <BirthDayModal isOpen={isModalOpen} onCancel={closeNotificationModal} data={birthdayData} />,
      [NOTIFICATION_COMPONENTS.NOTE]: <NoteModal isOpen={isModalOpen} onCancel={closeNotificationModal} data={noteData!} />,
      [NOTIFICATION_COMPONENTS.BREAK]: <BreakModal isOpen={isBreakNotified} onCancel={closeNotificationModal} />
    };
    return activeNotification ? modals[activeNotification] : null;
  };

  return (
    <div>
      {children}
      {getNotificationComponents()}
      <Modal isOpen={prevModal} onClose={closePrevModal}>
        <p style={{ textAlign: 'center', fontSize: '25px' }}>
          С возвращением <br />
          {userInfo?.first_name} {userInfo?.second_name}
        </p>
      </Modal>
      {prevModal && <GreetingsModal isOpen={prevModal} onCancel={closePrevModal} />}
    </div>
  );
};
