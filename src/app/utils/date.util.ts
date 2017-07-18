import {isPast, isDate, isValid, differenceInYears, parse, format} from 'date-fns';
export const isValidDate = (dateStr) => {
  const date = parse(dateStr);
  return isDate(date) && isValid(date) && isPast(date) && differenceInYears(new Date(), date) < 150;
};

export const toDate = (dateStr) => {
  return format(parse(dateStr), 'YYYY-MM-DD');
};
