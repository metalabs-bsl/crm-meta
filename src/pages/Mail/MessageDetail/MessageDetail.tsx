import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Icon, Loading } from 'common/ui';
import { DeleteModal } from 'common/components';
import { mockData, userMailData } from '../Mail.helper';
import { IMailChainData, IMailData } from '../types/mailsData';
import { AnswerForm } from './AnswerForm';
import { MessageCard } from './MessageCard';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const MessageDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<{ mailChain: IMailChainData[]; theme: string }>({ mailChain: [], theme: '' });
  const [showAnswerForm, setShowAnswerForm] = useState<boolean>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>();

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

  const handleClickUnread = () => {
    alert(`Цепочка писем c темой ${data.theme}`);
    handleGoBack();
  };

  const handleClickDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    alert(`Цепочка писем с темой ${data.theme} удалена`);
    setShowDeleteModal(false);
    handleGoBack();
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
            <div className={styles.btnInner} onClick={handleClickUnread}>
              <Icon className={`${styles.btn} ${styles.btnCancel}`} type='sms-gray' />
              <span className={`${styles.btnText} ${styles.cancel}`}>Отметить как непрочитанное</span>
            </div>
            <div className={styles.btnInner} onClick={handleClickDelete}>
              <Icon className={`${styles.btn} ${styles.btnDelete}`} type='trash-gray' />
              <span className={`${styles.btnText} ${styles.delete}`}>Удалить</span>
            </div>
          </div>
        </div>
        <div className={styles.messageBody}>
          {data.mailChain.map((el, idx) => (
            <MessageCard {...el} key={idx} />
          ))}
          {showAnswerForm ? (
            <AnswerForm user={userMailData} setShowAnswerForm={setShowAnswerForm} />
          ) : (
            <div className={styles.answerBtn}>
              <Button text={'ответить'} styleType={BUTTON_TYPES.YELLOW} onClick={() => setShowAnswerForm(true)} />
            </div>
          )}
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        text={`Вы действительно хотите удалить цепочку писем с темой ${data.theme}`}
        onDelete={handleDelete}
      />
    </Loading>
  );
};
