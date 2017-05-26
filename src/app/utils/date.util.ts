import {isPast, parse} from "date-fns";
export const isValidDate = (dateStr) => {
  const date = parse(dateStr);
  return isPast(date);
}