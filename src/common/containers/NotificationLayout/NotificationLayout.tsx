import { FC, ReactNode, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { BirthDayModal, BreakModal, GreetingsModal, Modal } from 'common/components';
// import { LeadFlyModal } from 'common/components/LeadFlyModal';
import { NoteModal } from 'common/components/NoteModal';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useGetCalendarDataQuery } from 'api/admin/calendar/calendar.api';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { modalSelectors } from 'api/admin/modal/modal.selectors';
import { setBirthdayModalShown, setIsModalOpen, setIsPreved, setNoteModalShown, setPrevModalShown } from 'api/admin/modal/modals.slice';
import { useGetWorkTimeInfoQuery } from 'api/admin/workTime/workTime.api';
import { Birthday, Note } from 'types/entities';

import { getSocket } from 'socket';
// import { leadFlyData } from './NotificationLayout.helper';
import { NOTIFICATION_COMPONENTS } from 'types/enums';

interface IProps {
  children: ReactNode;
}

export const NotificationLayout: FC<IProps> = ({ children }) => {
  const { data: workTimeData } = useGetWorkTimeInfoQuery();
  const { data: calendarData } = useGetCalendarDataQuery();
  const [activeNotification, setActiveNotification] = useState<NOTIFICATION_COMPONENTS | null>(null);
  const [isBreakNotified, setIsBreakNotified] = useState<boolean>(false);
  const [birthdayData, setBirthdayData] = useState<Birthday | undefined>(undefined);
  const [noteData, setNoteData] = useState<Note | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(employeesSelectors.employees);
  const { prevModalShown, isPreved, noteModalShown, birthdayModalShown, isModalOpen } = useAppSelector(modalSelectors.modal);

  const closeNotificationModal = () => {
    dispatch(setIsModalOpen(false));
    setActiveNotification(null);
    dispatch(setIsPreved(false));
    dispatch(setBirthdayModalShown(true));
    dispatch(setNoteModalShown(true));
    if (activeNotification === NOTIFICATION_COMPONENTS.BREAK) {
      setIsBreakNotified(true);
    }
  };

  const openNotificationModal = (type: NOTIFICATION_COMPONENTS) => {
    setActiveNotification(type);
    dispatch(setIsModalOpen(true));
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
      dispatch(setPrevModalShown(true));
    }
  }, [userInfo, dispatch]);

  const socket = getSocket();

  useEffect(() => {
    const handleNoteMessage = (message: { body?: Note; message: string }) => {
      console.log(message);
      if (message.body) {
        const note = message.body;
        const eventTime = dayjs(note.date).utc();
        const reminderMinutes = getReminderOffset(note.reminderTypes[0]);
        const reminderTime = eventTime.subtract(reminderMinutes, 'minute').local();
        // reminderTime = reminderTime.add(+6, 'hour');
        const now = dayjs();
        const timeUntilReminder = reminderTime.diff(now);

        if (note.title === 'lol') {
          console.log('Event Time (Local):', eventTime.format('YYYY-MM-DD HH:mm:ss Z'));
          console.log('Reminder Time (Local):', reminderTime.format('YYYY-MM-DD HH:mm:ss Z'));
          console.log('Now:', now.format('YYYY-MM-DD HH:mm:ss Z'));
        }

        if (timeUntilReminder > 0) {
          console.log('timeout set');
          setTimeout(() => {
            new Audio('/notification.mp3').play();
            setNoteData(note);
            dispatch(setNoteModalShown(true));
            openNotificationModal(NOTIFICATION_COMPONENTS.NOTE);
          }, timeUntilReminder);
        }
      } else {
        console.log(message);
        new Audio('/notification.mp3').play();
      }
    };

    // Подписываемся на событие 'note'
    socket?.on('note', handleNoteMessage);

    // Отписываемся при размонтировании компонента
    return () => {
      socket?.off('note', handleNoteMessage);
    };
  }, [dispatch, getReminderOffset, openNotificationModal]);

  useEffect(() => {
    if (calendarData) {
      calendarData.notes.forEach((note) => {
        const eventTime = dayjs(note.date).utc();
        const reminderMinutes = getReminderOffset(note.reminderTypes[0]);
        let reminderTime = eventTime.subtract(reminderMinutes, 'minute').local();
        reminderTime = reminderTime.add(-6, 'hour');
        const now = dayjs();
        const timeUntilReminder = reminderTime.diff(now);

        if (timeUntilReminder > 0) {
          setTimeout(() => {
            new Audio('/notification.mp3').play();
            setNoteData(note);
            dispatch(setNoteModalShown(true));
            openNotificationModal(NOTIFICATION_COMPONENTS.NOTE);
          }, timeUntilReminder);
        }
      });
      console.log(calendarData);
      const today = dayjs().startOf('day').format('MM-DD');
      const birthdayToday = calendarData.birthdays.find((birthday) => dayjs(birthday.date).utc().startOf('day').format('MM-DD') === today);
      if (birthdayToday && !birthdayModalShown) {
        setTimeout(() => {
          new Audio('/notification.mp3').play();
          setBirthdayData(birthdayToday);
          dispatch(setBirthdayModalShown(true));
          openNotificationModal(NOTIFICATION_COMPONENTS.BIRTHDAY);
        }, 5000);
      }
    }
  }, [calendarData, birthdayModalShown, noteModalShown, dispatch]);

  useEffect(() => {
    if (userInfo && isPreved) {
      openNotificationModal(NOTIFICATION_COMPONENTS.NOTE);
    }
  }, [isPreved, userInfo]);

  const closePrevModal = () => {
    dispatch(setPrevModalShown(false));
    dispatch(setIsPreved(false));
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
        if (remainingDuration.asMinutes() <= 15 && !isBreakNotified) {
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
  }, [openNotificationModal, workTimeData, isBreakNotified]);
  const getNotificationComponents = () => {
    const modals: Record<NOTIFICATION_COMPONENTS, ReactNode> = {
      [NOTIFICATION_COMPONENTS.BIRTHDAY]: <BirthDayModal isOpen={isModalOpen} onCancel={closeNotificationModal} data={birthdayData} />,
      [NOTIFICATION_COMPONENTS.NOTE]: <NoteModal isOpen={isModalOpen} onCancel={closeNotificationModal} data={noteData!} />,
      [NOTIFICATION_COMPONENTS.BREAK]: <BreakModal isOpen={isBreakNotified} onCancel={closeNotificationModal} />
      // [NOTIFICATION_COMPONENTS.LEADFLY]: <LeadFlyModal isOpen={isModalOpen} onCancel={closeNotificationModal} data={leadFlyData} />
    };
    return activeNotification ? modals[activeNotification] : null;
  };

  return (
    <div>
      {children}
      {getNotificationComponents()}
      <Modal isOpen={prevModalShown} onClose={closePrevModal}>
        <p style={{ textAlign: 'center', fontSize: '25px' }}>
          С возвращением <br />
          {userInfo?.first_name} {userInfo?.second_name}
        </p>
      </Modal>
      {prevModalShown && <GreetingsModal isOpen={prevModalShown} onCancel={closePrevModal} />}
    </div>
  );
};
