import {isPast, parse, format} from 'date-fns';
export const isValidDate = (dateStr) => {
  const date = parse(dateStr);
  return isPast(date);
};

export const toDate = (dateStr) => {
  return format(parse(dateStr), 'YYYY-MM-DD');
}
