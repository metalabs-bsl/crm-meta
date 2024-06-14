import { FC } from 'react';
import { Button } from 'common/ui';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface DeleteRowProps {
  onClickEvent: () => void;
}

export const DeleteRow: FC<DeleteRowProps> = ({ onClickEvent }) => {
  return (
    <div className={styles.deleteRow}>
      <Button text='удалить' className={styles.btn} styleType={BUTTON_TYPES.LINK_GRAY} onClick={onClickEvent} />
    </div>
  );
};
