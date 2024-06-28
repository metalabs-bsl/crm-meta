import { FC } from 'react';
import { IMailChainData } from 'pages/Mail/types/mailsData';
import styles from './styes.module.scss';

export const MessageCard: FC<IMailChainData> = ({ image, name, email, date, text, reply }) => {
  console.log(reply);

  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <img src={image} alt='user image' />
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>
          <div className={styles.about}>
            <span className={styles.name}>{name}</span>
            <span className={styles.email}>{email}</span>
          </div>
          <div className={styles.dateWrapper}>
            <span>{date}</span>
          </div>
        </div>
        <p className={styles.contentText}>{text}</p>
      </div>
    </div>
  );
};
