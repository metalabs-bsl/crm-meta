import { Button } from 'common/ui';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const DeleteRow = () => {
  return (
    <div className={styles.deleteRow}>
      <Button text='удалить' className={styles.btn} styleType={BUTTON_TYPES.LINK_GRAY} />
    </div>
  );
};
