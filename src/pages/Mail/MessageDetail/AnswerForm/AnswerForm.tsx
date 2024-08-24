import { ChangeEvent, FC, useState } from 'react';
import { Button } from 'common/ui';
import { useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import styles from './styles.module.scss';

import ReactTextareaAutosize from 'react-textarea-autosize';
import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  setShowAnswerForm: (arg0: boolean) => void;
}

export const AnswerForm: FC<IProps> = ({ setShowAnswerForm }) => {
  const [content, setContent] = useState<string>('');
  const { userInfo } = useAppSelector(employeesSelectors.employees);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSend = () => {
    console.log(content);
    setShowAnswerForm(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.imgWrapper}>
          <img src={`${process.env.REACT_APP_BASE_URL}/${userInfo?.avatar?.path}`} alt='user image' />
        </div>
        <div className={styles.content}>
          <div className={styles.heading}>
            <div className={styles.about}>
              <div className={styles.fullName}>
                <span className={styles.name}>{userInfo?.second_name}</span>
                <span className={styles.name}>{userInfo?.first_name}</span>
                <span className={styles.name}>{userInfo?.middle_name}</span>
              </div>
              <span className={styles.email}>{userInfo?.email}</span>
            </div>
          </div>
          <ReactTextareaAutosize
            className={styles.contentText}
            value={content}
            onChange={handleChange}
            placeholder='Напишите ваше сообщение'
          />
          <Button text={'отправить'} styleType={BUTTON_TYPES.YELLOW} className={styles.btnSend} onClick={handleSend} />
          <Button
            text={'отменить'}
            styleType={BUTTON_TYPES.Link_BLACK}
            onClick={() => setShowAnswerForm(false)}
            className={styles.btnCancel}
          />
        </div>
      </div>
    </div>
  );
};
