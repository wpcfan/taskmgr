import {isFuture, isDate, isValid, differenceInYears, parse, format} from 'date-fns';
export const isValidDate = (dateStr) => {
  const date = parse(dateStr);
  return isDate(date) && isValid(date) && !isFuture(date);
};

export const toDate = (date: Date) => {
  return format(date, 'YYYY-MM-DD');
};
