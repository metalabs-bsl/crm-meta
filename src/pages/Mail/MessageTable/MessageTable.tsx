import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Button, Checkbox } from 'common/ui';
import { Modal } from 'common/components';
import { dateFormat } from 'common/helpers';
// import { useRedirect } from 'common/hooks';
import { IMailData } from '../types/mailsData';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  columns: string[];
  data: IMailData[];
}

export const MessageTable: FC<IProps> = ({ columns, data }) => {
  const [messages, setMessages] = useState<IMailData[]>([]);
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [isBtnsShow, setIsBtnsShow] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<IMailData>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isAnyChecked = messages.some((message) => message.checked);
    setIsBtnsShow(isAnyChecked);
  }, [messages]);

  const onToggleAllChecked = (e: boolean) => {
    setAllChecked(e);
    const updated = messages.map((i) => ({ ...i, checked: e }));
    setMessages(updated);
  };

  const onMessageChecked = (e: boolean, id: number) => {
    const updated = messages.map((i) => {
      if (i.id === id) {
        return { ...i, checked: e };
      }
      return i;
    });
    setMessages(updated);
    setAllChecked(false);

    const found = messages.find((i) => i.id === id);
    setCurrentMessage(found);
  };

  const handlePinAll = () => {
    console.log('закрепить все', currentMessage);
  };

  const handleUnpinAll = () => {
    console.log('открепить все', currentMessage);
  };

  const markAsRead = () => {
    console.log('отправить на прочитанное', currentMessage);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => (b.pick ? 1 : 0) - (a.pick ? 1 : 0));
    setMessages(sortedData);
  }, [data]);

  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.headTr}>
            <th>
              <Checkbox className={styles.checkbox} checked={allChecked} onChange={(e) => onToggleAllChecked(e.target.checked)} />
            </th>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            <td className={styles.markerBox}>
              <span className={styles.marker}></span>
            </td>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {messages.map((message) => {
            const formatDate = dateFormat(message.date);
            return (
              <tr key={message.id} className={cn({ [styles.unread]: message.unread })}>
                <td>
                  <Checkbox
                    className={styles.checkbox}
                    checked={message.checked}
                    onChange={(e) => onMessageChecked(e.target.checked, message.id)}
                  />
                </td>
                <td>{message.sender}</td>
                <td>{message.text}</td>
                <td>{formatDate}</td>
                <td className={styles.markerBox}>{message.pick && <span className={styles.marker}></span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isBtnsShow && (
        <div className={styles.btns_wrapper}>
          <Button styleType={BUTTON_TYPES.GREEN} text='открепить все' onClick={handleUnpinAll} />
          <Button styleType={BUTTON_TYPES.GREEN} text='закрепить все' onClick={handlePinAll} />
          <Button styleType={BUTTON_TYPES.LINK_GRAY} text='переслать' />
          <Button styleType={BUTTON_TYPES.LINK_GRAY} text='отметить как прочитанное' onClick={markAsRead} />
          <Button styleType={BUTTON_TYPES.LINK_GRAY} text='удалить' onClick={handleModalOpen} />
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className={styles.modalInner}>
          <span>here need to place the current sms</span>
          <div className={styles.modalBtnWrapper}>
            <Button className={styles.readyBtn} styleType={BUTTON_TYPES.GREEN} text='Да, удалить' onClick={handleModalClose} />
            <Button className={styles.readyBtn} styleType={BUTTON_TYPES.GRAY} text='Отменить' onClick={handleModalClose} />
          </div>
        </div>
      </Modal>
    </div>
  );
};
