export const isDateString = (str: string) => {
  const date = new Date(str);
  return !isNaN(date.getTime());
};
