import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Icon, Loading } from 'common/ui';
import { mockData } from '../Mail.helper';
import { IMailChainData, IMailData } from '../types/mailsData';
import { MessageCard } from './MessageCard';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const MessageDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<{ mailChain: IMailChainData[]; theme: string }>({ mailChain: [], theme: '' });

  const findMailChainAndThemeById = useCallback(
    (data: IMailData[]): { mailChain: IMailChainData[]; theme: string } => {
      const foundMail = data.find((el) => String(el.id) === id);
      return { mailChain: foundMail ? foundMail.mailChain : [], theme: foundMail?.theme || '' };
    },
    [id]
  );

  console.log(data);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setData(findMailChainAndThemeById(mockData));
  }, [findMailChainAndThemeById]);

  return (
    <Loading>
      <div className={styles.message}>
        <div className={styles.messageHead}>
          <Icon className={styles.back} type='go-back' onClick={handleGoBack} />
          <h1>{data.theme}</h1>
          <div className={styles.btnWrapper}>
            <div className={styles.btnInner}>
              <Icon className={`${styles.btn} ${styles.btnCancel}`} type='sms-gray' />
              <span className={`${styles.btnText} ${styles.cancel}`}>Отметить как непрочитанно</span>
            </div>
            <div className={styles.btnInner}>
              <Icon className={`${styles.btn} ${styles.btnDelete}`} type='trash-gray' />
              <span className={`${styles.btnText} ${styles.delete}`}>Удалить</span>
            </div>
          </div>
        </div>
        <div className={styles.messageBody}>
          {data.mailChain.map((el, idx) => (
            <MessageCard {...el} key={idx} />
          ))}
          <div className={styles.answerBtn}>
            <Button text={'ответить'} styleType={BUTTON_TYPES.YELLOW} />
          </div>
        </div>
      </div>
    </Loading>
  );
};
