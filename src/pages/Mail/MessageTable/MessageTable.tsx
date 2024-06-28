import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Button, Checkbox } from 'common/ui';
import { dateFormat } from 'common/helpers';
import { useRedirect } from 'common/hooks';
import { IMailData } from '../types/mailsData';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  columns: string[];
  messages: IMailData[];
}

const actionBtns = [
  { text: 'открепить', style: BUTTON_TYPES.YELLOW, action: () => console.log('Открепить'), isChangeble: true },
  { text: 'закрепить', style: BUTTON_TYPES.YELLOW, action: () => console.log('Закрепить'), isChangeble: true },
  { text: 'переслать', style: BUTTON_TYPES.LINK_GRAY, action: () => console.log('переслать') },
  { text: 'отметить как прочитанное', style: BUTTON_TYPES.LINK_GRAY, action: () => console.log('отметить как прочитанное') },
  { text: 'удалить', style: BUTTON_TYPES.LINK_GRAY, action: () => console.log('удалить') }
];

export const MessageTable: FC<IProps> = ({ columns, messages }) => {
  const [localMessages, setLocalMessages] = useState<IMailData[]>(messages);
  const [allChecked, setAllCheced] = useState<boolean>(false);
  const [isBtnsShow, setIsBtnsShow] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<IMailData>();
  const redirectTo = useRedirect();

  useEffect(() => {
    const isAnyChecked = localMessages.some((message) => message.checked);
    setIsBtnsShow(isAnyChecked);
  }, [localMessages]);

  const onToggleAllChecked = (e: boolean) => {
    setAllCheced(e);
    const updated = localMessages.map((i) => ({ ...i, checked: e }));
    setLocalMessages(updated);
  };

  const onMessageChecked = (e: boolean, id: number) => {
    const updated = localMessages.map((i) => {
      if (i.id === id) {
        return { ...i, checked: e };
      }
      return i;
    });
    setLocalMessages(updated);
    setAllCheced(false);

    const finded = localMessages.find((i) => i.id === id);
    setCurrentMessage(finded);
  };

  const handleClickMessage = (messageId: number) => {
    const id = messageId.toString();
    redirectTo.mailDetail({ id });
  };

  console.log(currentMessage);

  return (
    <div className={styles.table_wpapper}>
      <table className={styles.table}>
        <thead>
          <tr>
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
        <tbody>
          {localMessages.map((message) => {
            const formatDate = dateFormat(message.date);

            return (
              <tr
                key={message.id}
                className={cn({ [styles.unread]: message.unread })}
                onClick={() => {
                  handleClickMessage(message.id);
                }}
              >
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
          {actionBtns.map((btn, index) => {
            if (btn.isChangeble) {
              if (currentMessage?.pick) {
                if (btn.text === 'открепить') {
                  return <Button key={index} text={btn.text} styleType={btn.style} onClick={btn.action} />;
                }
              } else {
                if (btn.text === 'закрепить') {
                  return <Button key={index} text={btn.text} styleType={btn.style} onClick={btn.action} />;
                }
              }
            } else {
              return <Button key={index} text={btn.text} styleType={btn.style} onClick={btn.action} />;
            }
          })}
        </div>
      )}
    </div>
  );
};
