import { type FC, useEffect, useRef, useState } from 'react';
import { Icon } from 'common/ui';
import { useGetMessagesMutation } from 'api/admin/messages/messages.api';
import { IMessageResponse } from 'types/entities/messages';
import { chatMock as allChatMock } from './WhatsAppHelper/WhatsAppHelper';
import styles from './styles.module.scss';

const BATCH_SIZE = 10;

export const WhatsApp: FC<{ customer_phone: string }> = ({ customer_phone }) => {
  const [chatData, setChatData] = useState<IMessageResponse[]>([]);
  const [chatMessages] = useGetMessagesMutation();
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  // || для обновления данных чата
  // \/
  useEffect(() => {
    console.log(customer_phone);
    chatMessages(customer_phone)
      .unwrap()
      .then((msgs) => {
        setChatData(msgs);
      });
  }, [visibleCount]);

  // || для отслеживания прокрутки
  // \/
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current && chatContainerRef.current.scrollTop === 0) {
        const previousHeight = chatContainerRef.current.scrollHeight;
        setVisibleCount((prevCount) => Math.min(prevCount + BATCH_SIZE, allChatMock.length));
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight - previousHeight;
          }
        }, 0);
      }
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [chatData]);

  // || для автоскролла вниз
  // \/
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatData]);

  return (
    <div className={styles.whatsapp}>
      {chatData.length > 0 ? (
        <div ref={chatContainerRef} className={styles.chat}>
          {chatData.map((chat) => (
            <div key={chat.id} className={chat.isSender ? styles.left : styles.right}>
              <p className={styles?.message}>{chat?.message}</p>
              <span className={styles?.timestamp}>
                {chat?.timestamp.split('T')[0].split('-').reverse().join('-') + ' ' + chat?.timestamp.split('T')[1].split('.')[0]}
              </span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      ) : (
        <div className={styles.noMsg}>
          <Icon type='whatsApp-svg' />
          <span>Нет сообщений</span>
        </div>
      )}
    </div>
  );
};

export default WhatsApp;
