import { FC } from 'react';
import dayjs, { locale } from 'dayjs';
import cn from 'classnames';
import 'dayjs/locale/ru';
import styles from './style.module.scss';

interface IProps {
  date: string;
  className?: string;
}

export const Date: FC<IProps> = ({ date, className }) => {
  locale('ru');
  const inputDate = dayjs(date);
  const today = dayjs();

  const formatDate = (date: dayjs.Dayjs): string => {
    return date.format('D MMMM');
  };

  const getDisplayDate = (): string => {
    if (inputDate.isSame(today, 'day')) {
      return 'Сегодня';
    } else {
      return formatDate(inputDate);
    }
  };
  return <span className={cn(styles.date, className)}>{getDisplayDate()}</span>;
};
