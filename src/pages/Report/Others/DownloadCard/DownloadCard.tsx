import { FC } from 'react';
import { Button } from 'common/ui';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface DownloadCardProps {
  title: string;
  linkPDF: string;
  linkExcel: string;
}

const openLinkInNewTab = (link: string) => {
  window.open(link, '_blank');
};

export const DownloadCard: FC<DownloadCardProps> = ({ title, linkPDF, linkExcel }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.buttonsWrapper}>
        <Button
          className={styles.button}
          type='button'
          styleType={BUTTON_TYPES.YELLOW}
          text='выгрузить в PDF'
          onClick={() => openLinkInNewTab(linkPDF)}
        />
        <Button
          className={styles.button}
          type='button'
          styleType={BUTTON_TYPES.LINK_GRAY}
          text='выгрузить в Excel'
          onClick={() => openLinkInNewTab(linkExcel)}
        />
      </div>
    </div>
  );
};
