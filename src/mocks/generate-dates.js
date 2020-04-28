import {MONTHS_DAYS, TimeInMs} from '../helpers/constants.js';
import {getRandomIntegerNumber} from '../helpers/utils.js';

const generateStartDate = () => {
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const randomDay = getRandomIntegerNumber(1, MONTHS_DAYS[currentMonth.toString()]);
  const randomHour = getRandomIntegerNumber(0, 23);
  const randomMinutes = getRandomIntegerNumber(0, 59);

  return new Date(currentYear, currentMonth, randomDay, randomHour, randomMinutes);
};

const generateEventTimeDifference = () => {
  const minimalDifferenceInMinutes = 5;
  const randomDifferenceIterations = getRandomIntegerNumber(1, 12);
  const randomHoursAmount = getRandomIntegerNumber(1, 48);
  return ((minimalDifferenceInMinutes * randomDifferenceIterations) * randomHoursAmount) * TimeInMs.MINUTE;
};

const generateEndDate = (startDate) => {
  const parsedStartDate = Date.parse(startDate);
  const endDateInMs = parsedStartDate + generateEventTimeDifference();

  return new Date(endDateInMs);
};

export {generateStartDate, generateEndDate};

