import {isFuture, isDate, isValid, differenceInYears, parse, format} from 'date-fns';
export const isValidDate = (dateStr) => {
  console.log(dateStr)
  const date = parse(dateStr);
  console.log(date);
  return isDate(date) && isValid(date) && !isFuture(date);
};

export const toDate = (date: Date) => {
  return format(date, 'YYYY-MM-DD');
};
