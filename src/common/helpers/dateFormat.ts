import dayjs from 'dayjs';

export const dateFormatWithHour = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY, HH:mm');
};

export const dateFormat = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY');
};
