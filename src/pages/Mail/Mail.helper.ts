import { IMailData } from './types/mailsData';

export const formatDateToString = (dateString: string): string => {
  const date = new Date(dateString);

  const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${dayOfWeek}, ${day} ${month} ${year}, ${hours}:${minutes}`;
};

export const getSelectedMessageIds = (selectedRows: number[], messages: IMailData[]): number[] => {
  return selectedRows.map((index) => messages[index].id);
};

export const extractInfo = (input: string): string => {
  const regex = /"(.*?)"\s*<(.+?)>/;
  const match = input.match(regex);
  if (match) {
    if (match[1].trim() === '') {
      return match[2];
    }
    return match[1];
  }
  return input.trim();
};
