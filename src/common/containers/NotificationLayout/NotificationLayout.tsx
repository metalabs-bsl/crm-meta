import { FC, ReactNode, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { BirthDayModal, BreakModal, GreetingsModal, Modal } from 'common/components';
import { NoteModal } from 'common/components/NoteModal';
import { useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { useGetWorkTimeInfoQuery } from 'api/admin/workTime/workTime.api';
import { birthdayData, noteData } from './NotificationLayout.helper';

import { NOTIFICATION_COMPONENTS } from 'types/enums';

interface IProps {
  children: ReactNode;
}

export const NotificationLayout: FC<IProps> = ({ children }) => {
  const { data } = useGetWorkTimeInfoQuery();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [prevModal, setPrevModal] = useState<boolean>(false);
  const [isPreved, setIsPreved] = useState<boolean>(false);
  const [activeNotification, setActiveNotification] = useState<NOTIFICATION_COMPONENTS | null>(null);
  const [isBreakNotified, setIsBreakNotified] = useState<boolean>(false);

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
    if (userInfo && isPreved) {
      openNotificationModal(NOTIFICATION_COMPONENTS.NOTE);
    }
  }, [isPreved, userInfo]);

  const closePrevModal = () => {
    setPrevModal(false);
    setIsPreved(true);
  };

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (data?.break_started && !data.break_ended) {
      const updateCurrentPauseTime = () => {
        const now = dayjs().utc(true);
        const start = dayjs(data.break_started);
        const breakEndTime = start.add(1, 'hour');
        const remainingDuration = dayjs.duration(breakEndTime.diff(now));

        if (remainingDuration.asMinutes() <= 59 && !isBreakNotified) {
          openNotificationModal(NOTIFICATION_COMPONENTS.BREAK);
          new Audio('/notification.mp3').play();
          setIsBreakNotified(true);
        }
      };
      updateCurrentPauseTime();
      intervalId = setInterval(updateCurrentPauseTime, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [data, isBreakNotified]);
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
