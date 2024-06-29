import { FC, useCallback, useEffect, useState } from 'react';
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
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectAll = useCallback(() => {
    setSelectAll((prev) => !prev);
    setSelectedRows(() => (!selectAll ? messages.map((_, index) => index) : []));
  }, [selectAll, messages]);

  const handleSelectRow = useCallback((index: number) => {
    setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  }, []);

  const handlePinAll = () => {
    console.log('закрепить все', selectedRows);
  };

  const handleUnpinAll = () => {
    console.log('открепить все', selectedRows);
  };

  const markAsRead = () => {
    console.log('отправить на прочитанное', selectedRows);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
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
              <tr key={message.id} className={cn({ [styles.unread]: message.unread })}>
                <td>
                  <Checkbox className={styles.checkbox} checked={selectedRows.includes(index)} onChange={() => handleSelectRow(index)} />
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
      {selectedRows.length !== 0 && (
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
