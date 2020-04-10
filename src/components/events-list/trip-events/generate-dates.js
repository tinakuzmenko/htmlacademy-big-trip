import {getRandomIntegerNumber} from '../../../helpers/utils.js';
import {TIME_PARSE_COEFFICIENT} from '../../../helpers/constants.js';

const generateStartDate = () => {
  const randomDay = getRandomIntegerNumber(0, 29);
  const randomHour = getRandomIntegerNumber(9, 18);
  const randomMinutes = getRandomIntegerNumber(0, 59);

  return new Date(2020, 4, randomDay, randomHour, randomMinutes);
};

const generateEndDate = (startDate) => {
  return new Date(Date.parse(startDate) + getRandomIntegerNumber(1, 4) * TIME_PARSE_COEFFICIENT);
};

const getTimeDifference = (start, end) => {
  return (end - start) / TIME_PARSE_COEFFICIENT;
};

export {generateStartDate, generateEndDate, getTimeDifference};
