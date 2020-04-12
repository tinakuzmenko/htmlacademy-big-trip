import {getRandomIntegerNumber} from './utils.js';
import {TIME_PARSE_COEFFICIENT} from './constants.js';

const generateEventTimeDifference = () => {
  const differenceInMinutes = 10;
  const differenceIterations = getRandomIntegerNumber(1, 6);
  let difference = (differenceInMinutes * differenceIterations) * getRandomIntegerNumber(1, 4);

  return difference;
};

const getTimeDifference = (start, end) => {
  const differenceInMinutes = ((end - start) / TIME_PARSE_COEFFICIENT) * 60;
  if (differenceInMinutes % 60 === 0) {
    return differenceInMinutes / 60 + `H`;
  } else {
    return Math.floor(differenceInMinutes / 60) > 0 ? Math.floor(differenceInMinutes / 60) + `H` + Math.floor(differenceInMinutes % 60) + `M` : Math.floor(differenceInMinutes % 60) + `M`;
  }
};

export {generateEventTimeDifference, getTimeDifference};
