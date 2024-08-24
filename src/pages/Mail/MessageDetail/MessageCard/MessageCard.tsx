import { FC } from 'react';
import { formatDateToString } from 'pages/Mail/Mail.helper';
import { IMailChainData } from 'pages/Mail/types/mailsData';
import styles from './styes.module.scss';

import { sanitize } from 'dompurify';

interface IProps {
  data: IMailChainData;
}

export const MessageCard: FC<IProps> = ({ data }) => {
  const { image, name, email, date, text, reply } = data;
  return (
    <div className={styles.wrapper}>
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
              <span>{formatDateToString(date)}</span>
            </div>
          </div>
          <p className={styles.contentText} dangerouslySetInnerHTML={{ __html: sanitize(text) }} />
          {reply && (
            <div className={styles.reply}>
              <div className={styles.imgWrapper}>
                <img src={reply.image} alt='user image' />
              </div>
              <div className={styles.content}>
                <div className={styles.heading}>
                  <div className={styles.about}>
                    <span className={styles.name}>{reply.name}</span>
                    <span className={styles.email}>{reply.email}</span>
                  </div>
                  <div className={styles.dateWrapper}>
                    <span>{formatDateToString(reply.date)}</span>
                  </div>
                </div>
                <p className={styles.contentText}>{reply.text}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
