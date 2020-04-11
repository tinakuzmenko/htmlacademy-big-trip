import {getRandomIntegerNumber} from '../../../helpers/utils.js';
import {TIME_PARSE_COEFFICIENT} from '../../../helpers/constants.js';
import {generateTimeDifference} from './get-time-difference.js';

const currentYear = 2020;
const currentMonth = 4;

const generateStartDate = () => {
  const randomDay = getRandomIntegerNumber(0, 29);
  const randomHour = getRandomIntegerNumber(9, 18);
  const randomMinutes = getRandomIntegerNumber(0, 59);

  return new Date(currentYear, currentMonth, randomDay, randomHour, randomMinutes);
};

const generateEndDate = (startDate) => {
  return new Date(Date.parse(startDate) + Math.floor(generateTimeDifference()) * TIME_PARSE_COEFFICIENT / 60);
};

export {generateStartDate, generateEndDate};
