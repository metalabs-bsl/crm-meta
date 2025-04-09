import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';

extend(utc);

export const dateFormatWithHour = (date: string, format: string = 'DD.MM.YYYY, HH:mm') => {
  return dayjs(date).utc(true).format(format);
};

export const dateFormat = (date: string, format: string = 'DD.MM.YYYY') => {
  return dayjs(date).utc(true).format(format);
};
