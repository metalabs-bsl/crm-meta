import { FC } from 'react';
import { Change } from 'pages/CRM/Deals/CardDetail/CardDetail.helper';
import { Icon } from 'common/ui';
import styles from './styles.module.scss';

interface IProps {
  data: Change;
}

export const Edit: FC<IProps> = ({ data }) => {
  const { description } = data;

  return (
    <div className={styles.editContent}>
      <div className={styles.head}>
        <span>Редактирование:</span>
        <span>{description}</span>
      </div>
      <div className={styles.bottom}>
        <span className={styles.blocks}>Поступили</span>
        <Icon type='arrow-left' />
        <span className={styles.blocks}>Взят в обработку</span>
      </div>
    </div>
  );
};
