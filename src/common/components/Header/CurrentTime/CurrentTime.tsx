import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styles from './styles.module.scss';

export const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <span className={styles.time}>{currentTime}</span>;
};
