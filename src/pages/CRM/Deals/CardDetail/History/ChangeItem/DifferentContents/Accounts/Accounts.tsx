import { FC } from 'react';
import cn from 'classnames';
import { Account, Change, IDetail } from 'types/entities';
import styles from './styles.module.scss';
interface IProps {
  data: Change;
}

const isAccountDetail = (detail: IDetail): detail is Account => {
  return detail && (detail.detailType === 'accounts-create' || detail.detailType === 'accounts-delete');
};

export const Accounts: FC<IProps> = ({ data }) => {
  const { detail, description } = data;

  if (!detail || !isAccountDetail(detail)) {
    return null;
  }

  const { payment, comment, file, detailType } = detail;

  return (
    <div className={styles.accounts}>
      <span className={styles.title}>
        Счет: <span className={cn(styles.descTitle, { [styles.isRemoving]: detailType === 'accounts-delete' })}>{description}</span>
      </span>
      <div className={styles.middle}>
        <span className={styles.payment}>{payment}</span>
        <span className={styles.comment}>{comment}</span>
        <div className={styles.linkWrapper}>
          <a target='_blank' href={file.fileUrl} className={styles.link} rel='noreferrer'>
            {file.fileName}
          </a>
        </div>
      </div>
    </div>
  );
};
