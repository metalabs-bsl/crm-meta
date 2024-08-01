import { useEffect, useRef, useState } from 'react';
import { chatMock } from './WhatsAppHelper/WhatsAppHelper';
import styles from './styles.module.scss';

interface chatMock {
  id: number;
  isSender: boolean;
  message: string;
  timestamp: string;
}

export const WhatsApp = () => {
  const [chatData, setChatData] = useState<chatMock[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setChatData(chatMock);
  }, [chatMock]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatData]);

  return (
    <div className={styles.whatsapp}>
      <div className={styles.chat}>
        {chatData.map((chat) => (
          <div key={chat.id} className={chat.isSender ? styles.left : styles.right}>
            <div className={styles.message}>{chat.message}</div>
            <div className={styles.timestamp}>{chat.timestamp}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default WhatsApp;
