import { FC, useCallback, useState } from 'react';
import cn from 'classnames';
import { Button, Checkbox, Loading } from 'common/ui';
import { dateFormat } from 'common/helpers';
import { useNotify, useRedirect } from 'common/hooks';
import { useSetPinMessageMutation, useSetReadMessageMutation } from 'api/admin/mail/mail.api';
import { IMail } from 'types/entities';
import { extractInfo } from '../Mail.helper';
import styles from './styles.module.scss';

import { sanitize } from 'dompurify';
import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  columns: string[];
  data?: IMail[];
  isLoading: boolean;
}

export const MessageTable: FC<IProps> = ({ columns, data, isLoading = false }) => {
  const notify = useNotify();
  const [selectedRow, setSelectedRow] = useState<IMail | null>(null);
  const redirectTo = useRedirect();
  const [setReadMessage, { isLoading: isReadLoading }] = useSetReadMessageMutation();
  const [setPinMessage, { isLoading: isPinLoading }] = useSetPinMessageMutation();
  const handleSelectRow = useCallback((row: IMail) => {
    setSelectedRow((prev) => (prev?.id === row.id ? null : row));
  }, []);

  const handleClickMessage = (dialog: IMail) => {
    const id = dialog.id.toString();
    redirectTo.mailDetail({ id });
  };

  const toggleReadMessage = (row: IMail) => {
    setReadMessage({ id: row?.id, hasBeenRead: !row.hasBeenRead })
      .unwrap()
      .then(() => {
        notify(`отмечено как ${row.hasBeenRead ? 'не' : ''}прочитанное`);
        setSelectedRow(null);
      });
  };

  const togglePinMessage = (row: IMail) => {
    setPinMessage({ id: row?.id, isPinned: !row.isPinned })
      .unwrap()
      .then(() => {
        notify(row.isPinned ? 'откреплено' : 'закреплено');
        setSelectedRow(null);
      });
  };

  return (
    <Loading isSpin={isLoading || isReadLoading || isPinLoading}>
      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.headTr}>
              <th>
                <Checkbox className={styles.checkboxNotEllowed} disabled />
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
            {data?.map((message) => {
              const formatDate = dateFormat(message.created_at);
              const sender = extractInfo(columns.includes('отправитель') ? message.from : message.to);
              return (
                <tr
                  key={message.id}
                  className={cn({ [styles.unread]: !message.hasBeenRead })}
                  onClick={() => {
                    handleClickMessage(message);
                  }}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      className={styles.checkbox}
                      checked={selectedRow?.id === message.id}
                      onChange={() => handleSelectRow(message)}
                    />
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
        {selectedRow !== null && (
          <div className={styles.btns_wrapper}>
            <Button
              onClick={() => togglePinMessage(selectedRow)}
              styleType={BUTTON_TYPES.GREEN}
              text={`${selectedRow.isPinned ? 'открепить' : 'закрепить'}`}
            />
            <Button
              onClick={() => toggleReadMessage(selectedRow)}
              styleType={BUTTON_TYPES.LINK_GRAY}
              text={`отметить как ${selectedRow.hasBeenRead ? 'не' : ''}прочитанное`}
            />
          </div>
        )}
      </div>
    </Loading>
  );
};
