import { FC, ReactNode, useState } from 'react';
import { BirthDayModal, BreakModal } from 'common/components';
import { NoteModal } from 'common/components/NoteModal';
import { birthdayData, breakData, noteData } from './NotificationLayout.helper';

import { NOTIFICATION_COMPONENTS } from 'types/enums';

interface IProps {
  children: ReactNode;
}

export const NotificationLayout: FC<IProps> = ({ children }) => {
  const notificationType = NOTIFICATION_COMPONENTS.NOTE;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getNotificationComponents = (type: NOTIFICATION_COMPONENTS) => {
    const modals: Record<NOTIFICATION_COMPONENTS, ReactNode> = {
      [NOTIFICATION_COMPONENTS.BIRTHDAY]: <BirthDayModal isOpen={isModalOpen} onCancel={handleCancel} data={birthdayData} />,
      [NOTIFICATION_COMPONENTS.NOTE]: <NoteModal isOpen={isModalOpen} onCancel={handleCancel} data={noteData} />,
      [NOTIFICATION_COMPONENTS.BREAK]: <BreakModal isOpen={isModalOpen} onCancel={handleCancel} data={breakData} />
    };
    return modals[type];
  };

  return (
    <div>
      {children}
      {getNotificationComponents(notificationType)}
    </div>
  );
};
