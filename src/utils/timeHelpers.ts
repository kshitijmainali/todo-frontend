import * as momentTz from 'moment-timezone';
export const extractDate = (date: string | Date) => {
  try {
    const dateObj = momentTz(date);
    return dateObj.format('YYYY-MM-DD');
  } catch (error) {
    return '';
  }
};

export const extractTime = (date: string | Date) => {
  try {
    const dateObj = momentTz(date);
    return dateObj.format('HH:MM');
  } catch (error) {
    return '';
  }
};
