import { FC, useState } from 'react';
import { Modal } from 'common/components/Modal';

import { BUTTON_TYPES } from 'types/enums';

export const Calendar: FC = () => {
  const [open, setOpen] = useState<boolean>(true);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      Calendar page
      <Modal
        isOpen={open}
        onClose={onClose}
        leftBtnText='Да, Удалить'
        rightBtnText='Отменить'
        leftBtnStyle={BUTTON_TYPES.YELLOW}
        rightBtnStyle={BUTTON_TYPES.CANCEL}
        leftBtnAction={onClose}
        rightBtnAction={onClose}
      ></Modal>
    </div>
  );
};
