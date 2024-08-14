import { FC } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { dateFormatWithHour } from 'common/helpers';
import { Change, IDetail, Todo_Create, Todo_Status } from 'types/entities';
import styles from './styles.module.scss';

enum TODO_TYPE_ENUM {
  CREATE = 'todo-create',
  STATUS = 'todo-status'
}

const isTodoCreate = (detail: IDetail): detail is Todo_Create => detail.detailType === TODO_TYPE_ENUM.CREATE;
const isTodoStatus = (detail: IDetail): detail is Todo_Status => detail.detailType === TODO_TYPE_ENUM.STATUS;

interface IProps {
  data: Change;
}

export const Todo: FC<IProps> = ({ data }) => {
  const { detail, description, employee } = data;

  if (!detail) {
    return null;
  }

  if (isTodoCreate(detail)) {
    const date = dateFormatWithHour(detail.dedlineDate);

    return (
      <div className={styles.todo}>
        <div className={styles.headline}>
          <span className={styles.title}>
            Дело: <span className={styles.titleDesc}>{description}</span>
          </span>
          <span className={styles.employee}>{employee}</span>
        </div>
        <div className={styles.bottom}>
          <p className={styles.description}>{detail.comment}</p>
        </div>
        <div className={styles.dedline}>
          <span>Сделать до</span>
          <span className={styles.date}>{date}</span>
        </div>
      </div>
    );
  }

  if (isTodoStatus(detail)) {
    return (
      <div className={styles.todo}>
        <span className={styles.title}>
          Дело: <span className={styles.titleDesc}>{description}</span>
        </span>
        <div className={styles.statusBottom}>
          <span className={cn(styles.blocks, styles[detail.prev.color])}>{detail.prev.label}</span>
          <Icon type='arrow-left' />
          <span className={cn(styles.blocks, styles[detail.current.color])}>{detail.current.label}</span>
        </div>
      </div>
    );
  }

  return null;
};
