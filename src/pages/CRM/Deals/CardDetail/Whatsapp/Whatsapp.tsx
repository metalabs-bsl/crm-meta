import { useEffect, useRef, useState } from 'react';
import { chatMock as allChatMock } from './WhatsAppHelper/WhatsAppHelper';
import styles from './styles.module.scss';

interface ChatMock {
  id: number;
  isSender: boolean;
  message: string;
  timestamp: string;
}

const BATCH_SIZE = 10;

export const WhatsApp = () => {
  const [chatData, setChatData] = useState<ChatMock[]>([]);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  // || для обновления данных чата
  // \/
  useEffect(() => {
    const start = Math.max(allChatMock.length - visibleCount, 0);
    setChatData(allChatMock.slice(start));
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
              <p className={styles.message}>{chat.message}</p>
              <span className={styles.timestamp}>{chat.timestamp}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      ) : (
        <div className={styles.noMsg}>
          <svg viewBox='0 0 420 386' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M282.954 142.332C253.112 142.332 222.807 141.122 194.425 133.225C166.577 125.47 141.008 110.53 118.216 93.2066C103.259 81.8947 89.7272 72.9306 70.319 74.2823C51.3889 75.2715 33.2764 82.304 18.6469 94.3449C-6.0318 115.902 -2.29261 155.778 7.53613 183.809C22.3861 226.033 67.4345 255.38 105.788 274.482C150.053 296.572 198.662 309.52 247.45 316.635C290.184 323.144 345.061 327.84 382.096 299.951C416.141 274.339 425.471 215.859 417.138 176.374C415.113 164.702 408.881 154.174 399.617 146.778C375.722 129.312 340.075 140.98 313.224 141.549C303.253 141.905 293.139 142.332 282.954 142.332Z'
              fill='#F8F8F8'
            />
            <path
              d='M209.985 386C282.185 386 340.715 382.353 340.715 377.854C340.715 373.355 282.185 369.708 209.985 369.708C137.785 369.708 79.2559 373.355 79.2559 377.854C79.2559 382.353 137.785 386 209.985 386Z'
              fill='#F8F8F8'
            />
            <path
              d='M396.838 91.9615C398.765 91.9615 400.327 90.4007 400.327 88.4754C400.327 86.5501 398.765 84.9894 396.838 84.9894C394.91 84.9894 393.348 86.5501 393.348 88.4754C393.348 90.4007 394.91 91.9615 396.838 91.9615Z'
              fill='#E6E6E6'
            />
            <path
              d='M246.341 67.1323C248.269 67.1323 249.831 65.5715 249.831 63.6462C249.831 61.7209 248.269 60.1602 246.341 60.1602C244.414 60.1602 242.852 61.7209 242.852 63.6462C242.852 65.5715 244.414 67.1323 246.341 67.1323Z'
              fill='#E6E6E6'
            />
            <path d='M106.961 293.157V308.453' stroke='#E6E6E6' strokeWidth='3.55266' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M99.3047 300.805H114.618' stroke='#E6E6E6' strokeWidth='3.55266' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M50.8027 2V17.296' stroke='#E6E6E6' strokeWidth='3.55266' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M43.1074 9.64763H58.4559' stroke='#E6E6E6' strokeWidth='3.55266' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M328.389 80.7917V96.1233' stroke='#E6E6E6' strokeWidth='3.55266' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M320.73 88.4754H336.043' stroke='#E6E6E6' strokeWidth='3.55266' strokeLinecap='round' strokeLinejoin='round' />
            <path
              d='M189.796 285.616C206.248 308.591 231.147 324.113 259.037 328.781C286.926 333.448 315.531 326.88 338.58 310.516C341.429 308.497 344.175 306.336 346.807 304.042L389.291 316.884L373.017 269.395C381.14 252.408 384.621 233.577 383.105 214.813C381.59 196.048 375.132 178.018 364.387 162.552C353.642 147.086 338.992 134.734 321.925 126.751C304.857 118.767 285.979 115.435 267.206 117.093C248.433 118.752 230.433 125.341 215.033 136.193C199.633 147.045 187.381 161.773 179.52 178.883C171.659 195.992 168.469 214.875 170.274 233.614C172.079 252.353 178.814 270.281 189.796 285.58V285.616Z'
              fill='#FFFFFC'
              stroke='#E6E6E6'
              strokeWidth='3.55266'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M318.888 223.72C318.888 226.627 316.529 228.987 313.614 228.987C310.699 228.987 308.339 226.627 308.339 223.72C308.339 220.813 310.699 218.453 313.614 218.453C316.529 218.453 318.888 220.813 318.888 223.72Z'
              fill='#E6E6E6'
              stroke='#E6E6E6'
              strokeWidth='3.55266'
            />
            <path
              d='M284.877 223.72C284.877 226.627 282.517 228.987 279.602 228.987C276.687 228.987 274.327 226.627 274.327 223.72C274.327 220.813 276.687 218.453 279.602 218.453C282.517 218.453 284.877 220.813 284.877 223.72Z'
              fill='#E6E6E6'
              stroke='#E6E6E6'
              strokeWidth='3.55266'
            />
            <path
              d='M250.91 223.72C250.91 226.627 248.55 228.987 245.635 228.987C242.72 228.987 240.36 226.627 240.36 223.72C240.36 220.813 242.72 218.453 245.635 218.453C248.55 218.453 250.91 220.813 250.91 223.72Z'
              fill='#E6E6E6'
              stroke='#E6E6E6'
              strokeWidth='3.55266'
            />
            <path
              d='M224.624 213.013C208.172 235.988 183.273 251.51 155.383 256.178C127.494 260.846 98.8893 254.278 75.8395 237.914C72.9825 235.905 70.2364 233.744 67.6133 231.44L25.1289 244.352L41.4033 196.828C33.2796 179.841 29.7989 161.01 31.3145 142.246C32.8301 123.481 39.288 105.451 50.033 89.985C60.7779 74.5189 75.4275 62.1673 92.495 54.1836C109.563 46.1998 128.441 42.8681 147.214 44.5265C165.987 46.1848 183.987 52.7743 199.387 63.6261C214.787 74.478 227.039 89.206 234.9 106.316C242.76 123.425 245.95 142.308 244.146 161.047C242.341 179.786 235.606 197.714 224.624 213.013Z'
              fill='#FFFFFC'
              stroke='#E6E6E6'
              strokeWidth='3.55266'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M107.391 171.785C110.551 166.453 115.035 162.026 120.409 158.933C125.784 155.839 131.867 154.184 138.069 154.127C144.272 154.069 150.385 155.612 155.815 158.606C161.246 161.6 165.811 165.943 169.07 171.216'
              stroke='#E6E6E6'
              strokeWidth='3.55266'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M181.391 135.502C181.391 137.289 179.94 138.741 178.146 138.741C176.352 138.741 174.901 137.289 174.901 135.502C174.901 133.715 176.352 132.262 178.146 132.262C179.94 132.262 181.391 133.715 181.391 135.502Z'
              fill='#E6E6E6'
              stroke='#E6E6E6'
              strokeWidth='3.55266'
            />
            <path
              d='M101.838 135.502C101.838 137.289 100.387 138.741 98.5935 138.741C96.7995 138.741 95.3486 137.289 95.3486 135.502C95.3486 133.715 96.7995 132.262 98.5935 132.262C100.387 132.262 101.838 133.715 101.838 135.502Z'
              fill='#E6E6E6'
              stroke='#E6E6E6'
              strokeWidth='3.55266'
            />
          </svg>
          <span>Нет сообщений</span>
        </div>
      )}
    </div>
  );
};

export default WhatsApp;
