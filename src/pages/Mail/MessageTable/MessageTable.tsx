import { FC, useCallback, useState } from 'react';
import cn from 'classnames';
import { Button, Checkbox, Loading } from 'common/ui';
import { DeleteModal } from 'common/components';
import { dateFormat } from 'common/helpers';
import { useRedirect } from 'common/hooks';
import { IMail } from 'types/entities';
import { extractInfo } from '../Mail.helper';
// import { getSelectedMessageIds } from '../Mail.helper';
import styles from './styles.module.scss';

import { sanitize } from 'dompurify';
import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  columns: string[];
  data?: IMail[];
  isLoading: boolean;
}

export const MessageTable: FC<IProps> = ({ columns, data, isLoading = false }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const redirectTo = useRedirect();

  const handleSelectAll = useCallback(() => {
    setSelectAll((prev) => !prev);
    data && setSelectedRows(() => (!selectAll ? data.map((_, index) => index) : []));
  }, [selectAll, data]);

  const handleSelectRow = useCallback((index: number) => {
    setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  }, []);

  // const handlePinAll = () => {
  //   const idsToPin = getSelectedMessageIds(selectedRows, messages);
  //   console.log('Закрепить все ID:', idsToPin);
  //   // Здесь можно добавить логику для закрепления всех выбранных
  // };

  // const handleUnpinAll = () => {
  //   const idsToUnpin = getSelectedMessageIds(selectedRows, messages);
  //   console.log('Открепить все ID:', idsToUnpin);
  //   // Здесь можно добавить логику для открепления всех выбранных
  // };

  // const markAsUnread = () => {
  //   const idsToUnread = getSelectedMessageIds(selectedRows, messages);
  //   console.log('Отметить как непрочитанное ID:', idsToUnread);
  //   // Здесь можно добавить логику для пометки как непрочитанные
  // };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleClickMessage = (dialog: IMail) => {
    const id = dialog.id.toString();
    redirectTo.mailDetail({ id });
  };

  // const handleResend = () => {
  //   const idsToResend = getSelectedMessageIds(selectedRows, messages);
  //   console.log('Переслать сообщения с ID:', idsToResend);
  //   // Здесь можно добавить логику для пересылки сообщений
  // };

  // const handleDelete = () => {
  //   const idsToDelete = getSelectedMessageIds(selectedRows, messages);
  //   console.log('Удалить сообщения с ID:', idsToDelete);
  //   // Здесь можно добавить логику для удаления сообщений
  //   handleModalClose();
  // };

  return (
    <Loading isSpin={isLoading}>
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
            {data?.map((message, index) => {
              const formatDate = dateFormat(message.created_at);
              const sender = extractInfo(message.from);
              return (
                <tr
                  key={message.id}
                  className={cn({ [styles.unread]: !message.hasBeenRead })}
                  onClick={() => {
                    handleClickMessage(message);
                  }}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <Checkbox className={styles.checkbox} checked={selectedRows.includes(index)} onChange={() => handleSelectRow(index)} />
                  </td>
                  <td>{sender}</td>
                  <td>
                    <span className={styles.subject}>{message.subject}, </span>
                    <span dangerouslySetInnerHTML={{ __html: sanitize(message.text) }} />
                  </td>
                  <td>{formatDate}</td>
                  {message.isPinned && <span className={styles.marker}></span>}
                </tr>
              );
            })}
          </tbody>
        </table>
        {selectedRows.length !== 0 && (
          <div className={styles.btns_wrapper}>
            <Button styleType={BUTTON_TYPES.GREEN} text='открепить все' />
            <Button styleType={BUTTON_TYPES.GREEN} text='закрепить все' />
            <Button styleType={BUTTON_TYPES.LINK_GRAY} text='отметить как прочитанное' />
            <Button styleType={BUTTON_TYPES.LINK_GRAY} text='удалить' onClick={handleModalOpen} />
          </div>
        )}
        <DeleteModal isOpen={isModalOpen} onCancel={handleModalClose} text={'Вы уверены, что хотите удалить выбранные письма?'} />
      </div>
    </Loading>
  );
};
