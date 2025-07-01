import { type FC, useEffect, useRef, useState } from 'react';
import { Icon } from 'common/ui';
import { useGetMessagesMutation } from 'api/admin/messages/messages.api';
import { IMessageResponse } from 'types/entities/messages';
import { chatMock as allChatMock } from './WhatsAppHelper/WhatsAppHelper';
import styles from './styles.module.scss';

const BATCH_SIZE = 10;

interface WhatsAppProps {
  customer_phone: string;
  initialChatData?: IMessageResponse[];
}

export const WhatsApp: FC<WhatsAppProps> = ({ customer_phone, initialChatData = [] }) => {
  const [chatData, setChatData] = useState<IMessageResponse[]>(initialChatData);
  const [chatMessages] = useGetMessagesMutation();
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isUserScrollingUp, setIsUserScrollingUp] = useState<boolean>(false);
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

  useEffect(() => {
    setChatData(initialChatData);
  }, [initialChatData]);

  // || для автоскролла вниз
  // \/
  useEffect(() => {
    if (chatEndRef.current && !isUserScrollingUp) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsUserScrollingUp(true);
    }
  }, [chatData, isUserScrollingUp]);

  return (
    <div className={styles.whatsapp}>
      {chatData.length > 0 ? (
        <div ref={chatContainerRef} className={styles.chat}>
          {chatData.map((chat) => (
            <div key={chat.id} className={chat.isSender ? styles.left : styles.right}>
              {chat.hasMedia ? (
                <>
                  {chat.fileType?.startsWith('image/') && chat.fileId && (
                    <img src={`http://localhost:8089/files/${chat.fileId}`} alt='Image' className={styles.image} />
                  )}
                  {chat.fileType?.startsWith('audio/') && chat.fileId && (
                    <audio controls>
                      <source src={`http://localhost:8089/files/${chat.fileId}`} type={chat.fileType} />
                      Your browser does not support the audio tag.
                    </audio>
                  )}
                  {chat.fileType?.startsWith('video/') && chat.fileId && (
                    <video controls className={styles.image}>
                      <source src={`http://localhost:8089/files/${chat.fileId}`} type={chat.fileType} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {!chat.fileType?.startsWith('image/') &&
                    !chat.fileType?.startsWith('audio/') &&
                    !chat.fileType?.startsWith('video/') &&
                    chat.fileId && (
                      <a href={`http://localhost:8089/files/${chat.fileId}`} target='_blank' rel='noreferrer'>
                        Скачать файл
                      </a>
                    )}
                </>
              ) : (
                <p className={styles.message}>{chat?.message}</p>
              )}
              <span className={styles.timestamp}>
                {chat.timestamp.split('T')[0].split('-').reverse().join('-') + ' ' + chat.timestamp.split('T')[1].split('.')[0]}
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
