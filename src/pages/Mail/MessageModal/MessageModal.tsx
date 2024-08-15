import { FC, useState } from 'react';
import { Icon } from 'common/ui';
import { Modal } from 'common/components';
import styles from './style.module.scss';

interface ModalProps {
  setModalActive: (active: boolean) => void;
}

const MessageModal: FC<ModalProps> = ({ setModalActive }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    message: '',
    signature: 'С уважением Абдулла и команда "Тони Старк" :)'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
    localStorage.setItem('messageData', JSON.stringify(formData));
  };

  return (
    <Modal isOpen={true} onClose={() => setModalActive(false)} className={styles.wrapper}>
      <div className={styles.modal_wrapper}>
        <div className={styles.header_title}>
          <span>Новое сообщение</span>
          <button className={styles.sendBtn} onClick={handleSubmit}>
            Отправить
          </button>
        </div>
        <div className={styles.modal_content}>
          <div className={styles.modal_field_sendMessage}>
            <label>Кому</label>
            <div className={styles.userIcon_input}>
              <Icon type='userIcon' />
              <input
                type='text'
                placeholder='Введите кому отправить'
                className={styles.input_sendMessage}
                name='recipient'
                value={formData.recipient}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.modal_field_message}>
            <label>Тема</label>
            <input
              type='text'
              placeholder='Введите тему сообщения'
              className={styles.input_message}
              name='subject'
              value={formData.subject}
              onChange={handleInputChange}
            />
            <textarea
              placeholder='Напишите ваше сообщение'
              rows={10}
              cols={140}
              name='message'
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <textarea className={styles.team} rows={5} cols={30} readOnly value={formData.signature} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MessageModal;
