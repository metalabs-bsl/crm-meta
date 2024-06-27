import { FC } from 'react';
import { Button } from 'common/ui';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  onDelete: () => void;
  onDownload: () => void;
}

export const DownloadDelete: FC<IProps> = ({ onDelete, onDownload }) => {
  return (
    <div className={styles.DownloadDelete}>
      <Button className={styles.btn} styleType={BUTTON_TYPES.GREEN} text='Скачать' onClick={onDownload} />
      <Button className={styles.btn} styleType={BUTTON_TYPES.GRAY} text='Удалить' onClick={onDelete} />
    </div>
  );
};
