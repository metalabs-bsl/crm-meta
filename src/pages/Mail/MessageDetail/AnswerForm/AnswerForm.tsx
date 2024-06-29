import { ChangeEvent, FC, useState } from 'react';
import { Button } from 'common/ui';
import styles from './styles.module.scss';

import ReactTextareaAutosize from 'react-textarea-autosize';
import { BUTTON_TYPES } from 'types/enums';

interface IUserData {
  image: string;
  name: string;
  email: string;
}

interface IProps {
  user: IUserData;
  setShowAnswerForm: (arg0: boolean) => void;
}

export const AnswerForm: FC<IProps> = ({ user, setShowAnswerForm }) => {
  const [content, setContent] = useState<string>('');

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
          <img src={user.image} alt='user image' />
        </div>
        <div className={styles.content}>
          <div className={styles.heading}>
            <div className={styles.about}>
              <span className={styles.name}>{user.name}</span>
              <span className={styles.email}>{user.email}</span>
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
