import { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Button, Checkbox } from 'common/ui';
import { DeleteModal } from 'common/components';
import { dateFormat } from 'common/helpers';
import { useRedirect } from 'common/hooks';
import { getSelectedMessageIds } from '../Mail.helper';
import { IMailData } from '../types/mailsData';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  columns: string[];
  data: IMailData[];
}

export const MessageTable: FC<IProps> = ({ columns, data }) => {
  const [messages, setMessages] = useState<IMailData[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const redirectTo = useRedirect();

  const handleSelectAll = useCallback(() => {
    setSelectAll((prev) => !prev);
    setSelectedRows(() => (!selectAll ? messages.map((_, index) => index) : []));
  }, [selectAll, messages]);

  const handleSelectRow = useCallback((index: number) => {
    setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  }, []);

  const handlePinAll = () => {
    const idsToPin = getSelectedMessageIds(selectedRows, messages);
    console.log('Закрепить все ID:', idsToPin);
    // Здесь можно добавить логику для закрепления всех выбранных
  };

  const handleUnpinAll = () => {
    const idsToUnpin = getSelectedMessageIds(selectedRows, messages);
    console.log('Открепить все ID:', idsToUnpin);
    // Здесь можно добавить логику для открепления всех выбранных
  };

  const markAsUnread = () => {
    const idsToUnread = getSelectedMessageIds(selectedRows, messages);
    console.log('Отметить как непрочитанное ID:', idsToUnread);
    // Здесь можно добавить логику для пометки как непрочитанные
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleClickMessage = (messageId: number) => {
    const id = messageId.toString();
    redirectTo.mailDetail({ id });
  };

  const handleResend = () => {
    const idsToResend = getSelectedMessageIds(selectedRows, messages);
    console.log('Переслать сообщения с ID:', idsToResend);
    // Здесь можно добавить логику для пересылки сообщений
  };

  const handleDelete = () => {
    const idsToDelete = getSelectedMessageIds(selectedRows, messages);
    console.log('Удалить сообщения с ID:', idsToDelete);
    // Здесь можно добавить логику для удаления сообщений
    handleModalClose();
  };

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      if (a.pick === b.pick) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.pick ? -1 : 1;
    });
    setMessages(sortedData);
  }, [data]);

  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.headTr}>
            <th>
              <Checkbox className={styles.checkbox} checked={selectAll} onChange={handleSelectAll} />
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
          {messages.map((message, index) => {
            const formatDate = dateFormat(message.date);
            return (
              <tr
                key={message.id}
                className={cn({ [styles.unread]: message.unread })}
                onClick={() => {
                  handleClickMessage(message.id);
                }}
              >
                <td onClick={(e) => e.stopPropagation()}>
                  <Checkbox className={styles.checkbox} checked={selectedRows.includes(index)} onChange={() => handleSelectRow(index)} />
                </td>
                <td>
                  {message.sender}
                  <span className={styles.senderCounter}>{message.mailChain.length}</span>
                </td>
                <td>{message.text}</td>
                <td>{formatDate}</td>
                {message.pick && <span className={styles.marker}></span>}
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedRows.length !== 0 && (
        <div className={styles.btns_wrapper}>
          <Button styleType={BUTTON_TYPES.GREEN} text='открепить все' onClick={handleUnpinAll} />
          <Button styleType={BUTTON_TYPES.GREEN} text='закрепить все' onClick={handlePinAll} />
          <Button styleType={BUTTON_TYPES.LINK_GRAY} text='переслать' onClick={handleResend} />
          <Button styleType={BUTTON_TYPES.LINK_GRAY} text='отметить как прочитанное' onClick={markAsUnread} />
          <Button styleType={BUTTON_TYPES.LINK_GRAY} text='удалить' onClick={handleModalOpen} />
        </div>
      )}
      <DeleteModal
        isOpen={isModalOpen}
        onCancel={handleModalClose}
        text={'Вы уверены, что хотите удалить выбранные письма?'}
        onDelete={handleDelete}
      />
    </div>
  );
};
