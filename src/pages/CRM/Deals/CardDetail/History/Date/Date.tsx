import { FC } from 'react';
import dayjs, { locale } from 'dayjs';
import 'dayjs/locale/ru';
import styles from '../styles.module.scss';

interface IProps {
  date: string;
}
export const Date: FC<IProps> = ({ date }) => {
  locale('ru');
  const inputDate = dayjs(date);
  const today = dayjs();

  const formatDate = (date: dayjs.Dayjs): string => {
    return date.format('D MMMM');
  };

  const getDisplayDate = (): string => {
    if (inputDate.isSame(today, 'day')) {
      return 'сегодня';
    } else {
      return formatDate(inputDate);
    }
  };
  return <span className={styles.date}>{getDisplayDate()}</span>;
};
