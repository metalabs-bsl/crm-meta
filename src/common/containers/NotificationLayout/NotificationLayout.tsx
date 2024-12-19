import { FC, ReactNode, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { BirthDayModal, BreakModal, GreetingsModal, Modal } from 'common/components';
import { setPrevModalShown, setIsPreved, setBirthdayModalShown, setNoteModalShown, setIsModalOpen } from 'api/admin/modal/modal.slice';
import { NoteModal } from 'common/components/NoteModal';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { useGetWorkTimeInfoQuery } from 'api/admin/workTime/workTime.api';
import { NOTIFICATION_COMPONENTS } from 'types/enums';
// import { leadFlyData } from './NotificationLayout.helper';
import { modalSelectors } from 'api/admin/modal/modal.selectors';
import { LeadFlyModal } from 'common/components/LeadFlyModal';
import { calendarSelectors } from 'api/admin/calendar/calendar.selector';
import { setBirthdays, setNotes } from 'api/admin/calendar/calendar.slice';

interface IProps {
  children: ReactNode;
}

export const NotificationLayout: FC<IProps> = ({ children }) => {
  const { data: workTimeData } = useGetWorkTimeInfoQuery();
  const [activeNotification, setActiveNotification] = useState<NOTIFICATION_COMPONENTS | null>(null);
  const [isBreakNotified, setIsBreakNotified] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(employeesSelectors.employees);
  const { notes, birthdays } = useAppSelector(calendarSelectors.calendar);
  const { prevModalShown, isPreved, noteModalShown, birthdayModalShown, isModalOpen } = useAppSelector(modalSelectors.modal);
  console.log( userInfo )
  console.log(birthdays, notes)
  const closeNotificationModal = () => {
    dispatch(setIsModalOpen(false));
    setActiveNotification(null);
    dispatch(setIsPreved(false));
    switch (activeNotification) {
      case NOTIFICATION_COMPONENTS.BREAK:
        setIsBreakNotified(true);
        break;
      case NOTIFICATION_COMPONENTS.BIRTHDAY:
        dispatch(setBirthdayModalShown(true));
        break;
      case NOTIFICATION_COMPONENTS.NOTE:
        dispatch(setNoteModalShown(true));
        break;
      default:
        break;
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

  const today = dayjs().startOf('day').format('MM-DD');
  const birthdayToday = birthdays.find((birthday) => dayjs(birthday.date).utc().startOf('day').format('MM-DD') === today);
  console.log(birthdayToday)

  useEffect(() => {
    notes.forEach((note) => {
      const eventTime = dayjs(note.date).utc().local(); // Преобразуем событие в локальное время
      const reminderMinutes = getReminderOffset(note.reminderTypes[0]);
      const reminderTime = eventTime.subtract(reminderMinutes, 'minute'); // Рассчитываем время напоминания
      const now = dayjs(); // Текущее локальное время

      if (reminderTime.isSame(now, 'minute')) {
        console.log('Triggering note notification');
        new Audio('/notification.mp3').play();
        dispatch(setNotes(notes))
        dispatch(setNoteModalShown(true));
        openNotificationModal(NOTIFICATION_COMPONENTS.NOTE);
      }
    });

    if (birthdayToday && !birthdayModalShown) {
      setTimeout(() => {
        new Audio('/notification.mp3').play();
        dispatch(setBirthdays(birthdays))
        dispatch(setBirthdayModalShown(true));
        openNotificationModal(NOTIFICATION_COMPONENTS.BIRTHDAY);
      }, 5000);
    }
  }, [notes, birthdays, birthdayModalShown, noteModalShown, dispatch]);

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
      [NOTIFICATION_COMPONENTS.BIRTHDAY]: <BirthDayModal isOpen={isModalOpen} onCancel={closeNotificationModal} data={birthdayToday} />,
      [NOTIFICATION_COMPONENTS.NOTE]: <NoteModal isOpen={isModalOpen} onCancel={closeNotificationModal} data={notes[0]} />,
      [NOTIFICATION_COMPONENTS.BREAK]: <BreakModal isOpen={isBreakNotified} onCancel={closeNotificationModal} />
      // [NOTIFICATION_COMPONENTS.LEADFLY]: <LeadFlyModal isOpen={isModalOpen} onCancel={closeNotificationModal} data={leadFlyData} />
    }
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
