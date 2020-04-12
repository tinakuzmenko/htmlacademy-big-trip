import {TIME_PARSE_COEFFICIENT} from '../helpers/constants.js';
import {getRandomIntegerNumber} from '../helpers/utils.js';
import {generateEventTimeDifference} from '../helpers/get-event-time-difference.js';

const now = new Date();

const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

const generateStartDate = () => {
  const randomDay = getRandomIntegerNumber(1, 30);
  const randomHour = getRandomIntegerNumber(0, 23);
  const randomMinutes = getRandomIntegerNumber(0, 59);

  return new Date(currentYear, currentMonth, randomDay, randomHour, randomMinutes);
};

const generateEndDate = (startDate) => {
  return new Date(Date.parse(startDate) + Math.floor(generateEventTimeDifference()) * TIME_PARSE_COEFFICIENT / 60);
};

export {generateStartDate, generateEndDate};
