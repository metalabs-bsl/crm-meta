import { FC } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { IIconType } from 'types/common';
import { Change, Deals_Calc, Deals_Create, Deals_Responsible, Deals_Status, IDetail } from 'types/entities';
import styles from './styles.module.scss';

interface IProps {
  data: Change;
}

enum DEAL_TYPE_ENUM {
  CREATE = 'deals-create',
  STATUS = 'deals-status',
  RESPONSIBLE = 'deals-responsible',
  CALC = 'deals-calc',
  READ = 'deals-read'
}

const isDealCreate = (detail: IDetail): detail is Deals_Create => detail.detailType === DEAL_TYPE_ENUM.CREATE;
const isPaidStatus = (detail: IDetail): detail is Deals_Status => detail.detailType === DEAL_TYPE_ENUM.STATUS;
const isResponsible = (detail: IDetail): detail is Deals_Responsible => detail.detailType === DEAL_TYPE_ENUM.RESPONSIBLE;
const isCalc = (detail: IDetail): detail is Deals_Calc => detail.detailType === DEAL_TYPE_ENUM.CALC;
const isRead = (detail: IDetail): detail is Deals_Calc => detail.detailType === DEAL_TYPE_ENUM.READ;

export const Deal: FC<IProps> = ({ data }) => {
  const { description, detail, employee, timestamp } = data;

  if (!detail) {
    return null;
  }

  if (isDealCreate(detail)) {
    return (
      <div className={styles.deal}>
        <div className={styles.headline}>
          <span className={styles.title}>
            Сделка: <span className={styles.descTitle}>{description}</span>
          </span>
          <span className={styles.employee}>{employee}</span>
        </div>
        <span className={styles.description}>{detail.title}</span>
      </div>
    );
  }

  if (isPaidStatus(detail)) {
    return (
      <div className={styles.deal}>
        <div className={styles.headline}>
          <span className={styles.title}>
            Сделка: <span className={styles.descTitle}>{description}</span>
          </span>
          <span className={styles.employee}>{employee}</span>
        </div>
        <div className={styles.bottom}>
          <span style={{ background: detail.current.color }} className={cn(styles.blocks, styles[detail.prev.color])}>
            {detail.prev.label}
          </span>
          <Icon type='arrow-left' />
          <span style={{ background: detail.prev.color }} className={cn(styles.blocks, styles[detail.current.color])}>
            {detail.current.label}
          </span>
        </div>
      </div>
    );
  }

  if (isResponsible(detail)) {
    return (
      <div className={styles.deal}>
        <div className={styles.headline}>
          <span className={styles.title}>
            Сделка: <span className={styles.descTitle}>{description}</span>
          </span>
          <span className={styles.employee}>{employee}</span>
        </div>
        <div className={styles.bottom}>
          <span className={styles.blocks}>{detail.prev}</span>
          <Icon type='arrow-left' />
          <span className={styles.blocks}>{detail.current}</span>
        </div>
      </div>
    );
  }

  if (isCalc(detail)) {
    return (
      <div className={styles.deal}>
        <div className={styles.headline}>
          <span className={styles.title}>
            Доступ: <span className={styles.descTitle}>{description}</span>
          </span>
          <span className={styles.employee}>{employee}</span>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottom}>
            <span className={styles.blocks}>
              {detail.prev.label}
              <Icon type={`calc-${detail.prev.label === 'Доступ открыт' ? 'open' : 'close'}` as IIconType} />
            </span>
            <Icon type='arrow-left' />
            <span className={styles.blocks}>
              {detail.current.label}
              <Icon type={`calc-${detail.current.label === 'Доступ открыт' ? 'open' : 'close'}` as IIconType} />
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isRead(detail)) {
    return (
      <div className={styles.deal}>
        <div className={styles.headline}>
          <span className={styles.title}>
            Сделка: <span className={styles.descTitle}>{description}</span>
          </span>
          <span className={styles.employee}>{employee}</span>
        </div>
        <div>
          <span className={styles.timeText}>Время просмотра: </span>
          <span>{timestamp}</span>
        </div>
      </div>
    );
  }

  return null;
};
