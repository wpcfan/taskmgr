import {isValid, differenceInYears, toDate, format} from 'date-fns';
export const isValidDate = (dateStr) => {
  const date = toDate(dateStr);
  return isValid(date);
};

export const convertToDate = (date: Date) => {
  return format(date, 'YYYY-MM-DD');
};
