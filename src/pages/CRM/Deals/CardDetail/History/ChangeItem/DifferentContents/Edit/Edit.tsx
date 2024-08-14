import { FC } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { Change, Edit_Naming, Edit_Other, Edit_Status, IDetail } from 'types/entities';
import styles from './styles.module.scss';

interface IProps {
  data: Change;
}

enum EDIT_TYPE_ENUM {
  NAMING = 'edit-naming',
  STATUS = 'edit-status',
  OTHER = 'edit-other'
}

const isEditStatus = (detail: IDetail): detail is Edit_Status => detail.detailType === EDIT_TYPE_ENUM.STATUS;
const isEditNaming = (detail: IDetail): detail is Edit_Naming => detail.detailType === EDIT_TYPE_ENUM.NAMING;
const isEditOther = (detail: IDetail): detail is Edit_Other => detail.detailType === EDIT_TYPE_ENUM.OTHER;

export const Edit: FC<IProps> = ({ data }) => {
  const { description, detail } = data;

  if (!detail) {
    return null;
  }

  if (isEditStatus(detail)) {
    return (
      <div className={styles.editContent}>
        <div className={styles.head}>
          <span>Редактирование:</span>
          <span className={styles.description}>{description}</span>
        </div>
        <div className={styles.bottom}>
          <span style={{ background: detail.prev.color }} className={cn(styles.blocks, styles[detail.prev.color])}>
            {detail.prev.label}
          </span>
          <Icon type='arrow-left' />
          <span style={{ background: detail.current.color }} className={cn(styles.blocks, styles[detail.current.color])}>
            {detail.current.label}
          </span>
        </div>
      </div>
    );
  }

  if (isEditNaming(detail)) {
    return (
      <div className={styles.editContent}>
        <div className={styles.head}>
          <span>Редактирование:</span>
          <span className={styles.description}>{description}</span>
        </div>
        <div className={styles.bottom}>
          <span className={styles.blocks}>{detail.prev}</span>
          <Icon type='arrow-left' />
          <span className={styles.blocks}>{detail.current}</span>
        </div>
      </div>
    );
  }

  if (isEditOther(detail)) {
    return (
      <div className={styles.editContent}>
        <div className={styles.head}>
          <span>Редактирование:</span>
          <span className={styles.description}>{description}</span>
        </div>
        <div className={styles.bottom_other}>
          {detail.items.map((item, index) => (
            <div key={index} className={styles.different}>
              <span className={styles.title}>{item.title}</span>
              <div className={styles.bottom}>
                <span className={styles.blocks}>{item.prev}</span>
                <Icon type='arrow-left' />
                <span className={styles.blocks}>{item.current}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
