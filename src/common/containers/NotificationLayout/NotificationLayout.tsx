import { FC, ReactNode, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { BirthDayModal, BreakModal, GreetingsModal, Modal } from 'common/components';
import { NoteModal } from 'common/components/NoteModal';
import { useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { useGetWorkTimeInfoQuery } from 'api/admin/workTime/workTime.api';
import { noteData } from './NotificationLayout.helper';

import { NOTIFICATION_COMPONENTS } from 'types/enums';
import { useGetCalendarDataQuery } from 'api/admin/calendar/calendar.api';

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
  const [birthdayData, setBirthdayData] = useState<any>(null);  


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

  useEffect(() => {
    if (userInfo) {
      setPrevModal(true);
    }
  }, [userInfo]);

  useEffect(() => {
    if (calendarData) {
      console.log('Calendar Data:', calendarData);
      const testDate = '04-20';
      const today = testDate || dayjs().startOf('day').format('MM-DD');
      const birthdayToday = calendarData.birthdays.find(birthday =>
        dayjs(birthday.date).utc().startOf('day').format('MM-DD') === today
      );
      calendarData.birthdays.forEach(birthday => {
        console.log('Проверяем дату:', dayjs(birthday.date).utc().startOf('day').format('MM-DD'));
      });
      console.log(today)
      console.log(birthdayToday)
      if (birthdayToday) {
        setTimeout(() => {
          // Воспроизведение аудиосигнала
          new Audio('/notification.mp3').play();
  
          // Установка данных и открытие модального окна
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
      const updateCurrentPauseTime = () => {
        const now = dayjs().utc(true);
        const start = dayjs(workTimeData.break_started);
        const breakEndTime = start.add(1, 'hour');
        const remainingDuration = dayjs.duration(breakEndTime.diff(now));

        if (remainingDuration.asMinutes() <= 59 && !isBreakNotified) {
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
      [NOTIFICATION_COMPONENTS.NOTE]: <NoteModal isOpen={isModalOpen} onCancel={closeNotificationModal} data={noteData} />,
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
