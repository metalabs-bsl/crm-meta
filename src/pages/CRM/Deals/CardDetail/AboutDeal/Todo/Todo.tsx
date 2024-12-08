import { FC, useEffect, useState } from 'react';
import { Icon } from 'common/ui';
import { IComment, ICreateReminderParams } from 'types/entities';
import { CreateForm } from './CreateContentForm';
import { CommentItem, TodoItem } from './GroupItem';
import { IDataBlock } from './Todo.helper';
import { WhatsApp } from '../../Whatsapp';
import styles from './style.module.scss';
import { IMessageResponse } from 'types/entities/messages';
import { useGetMessagesMutation } from 'api/admin/messages/messages.api';

interface IProps {
  reminders?: ICreateReminderParams[];
  comments?: IComment[];
  customerPhone?: string;
}

export const Todo: FC<IProps> = ({ reminders, comments, customerPhone }) => {
  const [chatData, setChatData] = useState<IMessageResponse[]>([]);
  const [chatMessages] = useGetMessagesMutation();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (customerPhone) {
      chatMessages(customerPhone)
        .unwrap()
        .then((msgs) => {
          setChatData(msgs);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [customerPhone, chatMessages]);

  const dataBlocks: IDataBlock[] = [
    {
      icon: 'history-todo',
      blockTitle: 'Запланированные дела',
      todoData: reminders,
      cardsType: 'todos'
    },
    {
      icon: 'history-comment',
      blockTitle: 'Комментарии',
      commentData: comments,
      cardsType: 'comments'
    }
  ];

  return (
    <div className={styles.container}>
      <CreateForm />
      {dataBlocks.map((block) => {
        const { blockTitle, icon, todoData, cardsType, commentData } = block;
        if (cardsType === 'todos') {
          return (
            <div className={styles.blocks} key={cardsType}>
              <div className={styles.blocks_title}>
                <Icon type={icon} />
                <span>{blockTitle}</span>
              </div>
              {todoData?.length ? (
                todoData.map((item, index) => <TodoItem key={index} item={item} />)
              ) : (
                <p className={styles.emptyText}>Нет данных!</p>
              )}
            </div>
          );
        }
        return (
          <div className={styles.blocks} key={cardsType}>
            <div className={styles.blocks_title}>
              <Icon type={icon} />
              <span>{blockTitle}</span>
            </div>
            {commentData?.length ? (
              commentData.map((item, index) => <CommentItem key={index} item={item} />)
            ) : (
              <p className={styles.emptyText}>Нет данных!</p>
            )}
          </div>
        );
      })}
      <div className={styles.chatContainer}>
        {isLoading ? (
          <p className={styles.emptyText}>Загрузка чата...</p>
        ) : (
          <WhatsApp customer_phone={customerPhone || ''} initialChatData={chatData} />
        )}
      </div>
    </div>
  );
};
