import { FC } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { IIconType } from 'types/common';
import { Change, Deals_Calc, Deals_Create, Deals_Loss, Deals_Responsible, Deals_Sail, Deals_Status, IDetail } from 'types/entities';
import styles from './styles.module.scss';

interface IProps {
  data: Change;
}

enum DEAL_TYPE_ENUM {
  CREATE = 'deals-create',
  STATUS = 'deals-status',
  RESPONSIBLE = 'deals-responsible',
  SAIL = 'deals-sail',
  LOSS = 'deals-loss',
  CALC = 'deals-calc'
}

const isDealCreate = (detail: IDetail): detail is Deals_Create => detail.detailType === DEAL_TYPE_ENUM.CREATE;
const isPaidStatus = (detail: IDetail): detail is Deals_Status => detail.detailType === DEAL_TYPE_ENUM.STATUS;
const isResponsible = (detail: IDetail): detail is Deals_Responsible => detail.detailType === DEAL_TYPE_ENUM.RESPONSIBLE;
const isSail = (detail: IDetail): detail is Deals_Sail => detail.detailType === DEAL_TYPE_ENUM.SAIL;
const isLoss = (detail: IDetail): detail is Deals_Loss => detail.detailType === DEAL_TYPE_ENUM.LOSS;
const isCalc = (detail: IDetail): detail is Deals_Calc => detail.detailType === DEAL_TYPE_ENUM.CALC;

export const Deal: FC<IProps> = ({ data }) => {
  const { description, detail } = data;

  if (!detail) {
    return null;
  }

  if (isDealCreate(detail)) {
    return (
      <div className={styles.deal}>
        <span className={styles.title}>
          Сделка: <span className={styles.descTitle}>{description}</span>
        </span>
        <span className={styles.description}>{detail.title}</span>
      </div>
    );
  }

  if (isPaidStatus(detail)) {
    return (
      <div className={styles.deal}>
        <span className={styles.title}>
          Сделка: <span className={styles.descTitle}>{description}</span>
        </span>
        <div className={styles.bottom}>
          <span className={cn(styles.blocks, styles[detail.prev.color])}>{detail.prev.label}</span>
          <Icon type='arrow-left' />
          <span className={cn(styles.blocks, styles[detail.current.color])}>{detail.current.label}</span>
        </div>
      </div>
    );
  }

  if (isResponsible(detail)) {
    return (
      <div className={styles.deal}>
        <span className={styles.title}>
          Сделка: <span className={styles.descTitle}>{description}</span>
        </span>
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
        <span className={styles.title}>
          Доступ: <span className={styles.descTitle}>{description}</span>
        </span>
        <div className={styles.bottom}>
          <div className={styles.bottom}>
            <span className={styles.blocks}>
              {detail.prev.label}
              <Icon type={detail.prev.icon as IIconType} />
            </span>
            <Icon type='arrow-left' />
            <span className={styles.blocks}>
              {detail.current.label}
              <Icon type={detail.current.icon as IIconType} />
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isLoss(detail)) {
    return (
      <div className={styles.deal}>
        <span className={styles.title}>
          Сделка: <span className={styles.descTitle}>{description}</span>
        </span>
        <div className={styles.bottom}>
          <span className={cn(styles.blocks, styles['not-paid'])}>Проигрыш: {detail.lossText}</span>
        </div>
      </div>
    );
  }

  if (isSail(detail)) {
    return (
      <div className={styles.deal}>
        <span className={styles.title}>
          Сделка: <span className={styles.descTitle}>{description}</span>
        </span>
        <div className={styles.bottom}>
          <span className={cn(styles.blocks, styles.paid)}>Продажа</span>
        </div>
      </div>
    );
  }

  return null;
};
