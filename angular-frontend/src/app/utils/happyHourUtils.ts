import { WEEKDAYS } from "./staticUtils";
//Determine which specials to display for the current date
export const getTodaysSpecials = (): string => {
  const day = new Date().getDay();
  return WEEKDAYS[day];
};
