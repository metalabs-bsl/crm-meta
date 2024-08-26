import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon, Loading } from 'common/ui';
import { DeleteModal, Modal } from 'common/components';
import { useNotify, useRedirect } from 'common/hooks';
import { useLazyGetSingleMailQuery, useSetReadMessageMutation } from 'api/admin/mail/mail.api';
import { ForwardForm } from './ForwardForm/ForwardForm';
import { MessageCard } from './MessageCard';
import styles from './styles.module.scss';

export const MessageDetail = () => {
  const redirect = useRedirect();
  const { id } = useParams();
  const notify = useNotify();
  // const [showAnswerForm, setShowAnswerForm] = useState<boolean>(false);
  const [isOpenForward, setIsOpenForward] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [getSingleDialog, { data, isFetching }] = useLazyGetSingleMailQuery();
  const [setReadMessage, { isLoading: isReadLoading }] = useSetReadMessageMutation();

  useEffect(() => {
    id && getSingleDialog(id);
  }, [getSingleDialog, id]);

  useEffect(() => {
    data && !data?.hasBeenRead && setReadMessage({ id: data?.id, hasBeenRead: true });
  }, [data, data?.hasBeenRead, data?.id, , setReadMessage]);

  const handleGoBack = () => {
    redirect.move({ number: -1 });
  };

  const handleClickUnread = () => {
    if (data) {
      setReadMessage({ id: data?.id, hasBeenRead: false })
        .unwrap()
        .then(() => {
          notify('Отмечено как непрочитанное');
          handleGoBack();
        });
    }
  };

  // const handleClickDelete = () => {
  //   setShowDeleteModal(true);
  // };

  const handleDelete = () => {
    alert(`Цепочка писем с темой ${data?.subject} удалена`);
    setShowDeleteModal(false);
    handleGoBack();
  };

  const onCloseForwardModal = () => {
    setIsOpenForward(false);
  };
  // useEffect(() => {
  //   if (showAnswerForm) {
  //     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [showAnswerForm]);

  return (
    <Loading isSpin={isFetching || isReadLoading}>
      <div className={styles.message}>
        <div className={styles.messageHead}>
          <Icon className={styles.back} type='go-back' onClick={handleGoBack} />
          <h1>{data?.subject}</h1>
          <div className={styles.btnWrapper} onClick={() => setIsOpenForward(true)}>
            <div className={styles.btnInner}>
              <Icon className={`${styles.btn} ${styles.btnCancel}`} type='forward' />
              <span className={`${styles.btnText} ${styles.delete}`}>Переслать</span>
            </div>
            <div className={styles.btnInner} onClick={handleClickUnread}>
              <Icon className={`${styles.btn} ${styles.btnCancel}`} type='sms-gray' />
              <span className={`${styles.btnText} ${styles.delete}`}>Отметить как непрочитанное</span>
            </div>
            {/* <div className={styles.btnInner} onClick={handleClickDelete}>
              <Icon className={`${styles.btn} ${styles.btnDelete}`} type='trash-gray' />
              <span className={`${styles.btnText} ${styles.delete}`}>Удалить</span>
            </div> */}
          </div>
        </div>
        <div className={styles.messageBody}>
          {data?.employee && (
            <MessageCard
              data={{
                attachments: data.attachments,
                name: data?.employee.second_name + data?.employee.first_name + data?.employee.middle_name,
                email: data.employee.email,
                image: `${process.env.REACT_APP_BASE_URL}/${data.employee.avatar.path}`,
                text: data.text,
                date: data.created_at
              }}
            />
          )}
          {/* {showAnswerForm ? (
            <AnswerForm setShowAnswerForm={setShowAnswerForm} />
          ) : (
            <div className={styles.answerBtn}>
              <Button text={'ответить'} styleType={BUTTON_TYPES.YELLOW} onClick={() => setShowAnswerForm(true)} />
            </div>
          )} */}
          <div ref={messageEndRef} />
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        text={`Вы действительно хотите удалить это письмо с темой ${data?.subject}`}
        onDelete={handleDelete}
      />
      {data && isOpenForward && (
        <Modal isOpen={isOpenForward} onClose={onCloseForwardModal}>
          <ForwardForm onClose={onCloseForwardModal} mail_id={data?.id} />
        </Modal>
      )}
    </Loading>
  );
};
