import { FC, ReactNode, useEffect, useState } from 'react';
import { BirthDayModal, BreakModal, GreetingsModal, Modal } from 'common/components';
import { NoteModal } from 'common/components/NoteModal';
import { useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { birthdayData, noteData } from './NotificationLayout.helper';

import { NOTIFICATION_COMPONENTS } from 'types/enums';

interface IProps {
  children: ReactNode;
}

export const NotificationLayout: FC<IProps> = ({ children }) => {
  const notificationType = NOTIFICATION_COMPONENTS.BREAK;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [prevModal, setPrevModal] = useState<boolean>(false);
  const [isPreved, setIsPreved] = useState<boolean>(false);

  const { userInfo } = useAppSelector(employeesSelectors.employees);

  const closeNotificationModal = () => {
    setIsModalOpen(false);
    setIsPreved(false);
  };

  const openNotificationModal = () => {
    setIsModalOpen(false);
    // const audio = new Audio('/notification.mp3');
    // audio.play().catch((error) => {
    //   console.error('Audio playback failed:', error);
    // });
  };

  useEffect(() => {
    if (userInfo) {
      setPrevModal(true);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo && isPreved) {
      openNotificationModal();
    }
  }, [isPreved, userInfo]);

  const closePrevModal = () => {
    setPrevModal(false);
    setIsPreved(true);
  };

  const getNotificationComponents = (type: NOTIFICATION_COMPONENTS) => {
    const modals: Record<NOTIFICATION_COMPONENTS, ReactNode> = {
      [NOTIFICATION_COMPONENTS.BIRTHDAY]: <BirthDayModal isOpen={isModalOpen} onCancel={closeNotificationModal} data={birthdayData} />,
      [NOTIFICATION_COMPONENTS.NOTE]: <NoteModal isOpen={isModalOpen} onCancel={closeNotificationModal} data={noteData} />,
      [NOTIFICATION_COMPONENTS.BREAK]: <BreakModal isOpen={isModalOpen} onCancel={closeNotificationModal} />
    };
    return modals[type];
  };

  return (
    <div>
      {children}
      {getNotificationComponents(notificationType)}
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
