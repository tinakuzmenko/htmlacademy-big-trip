import {TimeInMs} from '../../../helpers/constants.js';

const createTimeString = (value, signString) => {
  let timeString = ``;

  if (value > 0 && value < 10) {
    timeString = `0` + value + signString;
  }

  if (value > 10) {
    timeString = value + signString;
  }

  return timeString;
};

const getTimeDifference = (start, end) => {
  const difference = end - start;

  const days = Math.trunc(difference / TimeInMs.DAY);
  const daysString = createTimeString(days, `D`);

  const hours = Math.trunc((difference % TimeInMs.DAY) / TimeInMs.HOUR);
  const hoursString = createTimeString(hours, `H`);

  const minutes = Math.trunc(((difference % TimeInMs.DAY) % TimeInMs.HOUR) / TimeInMs.MINUTE);
  const minutesString = createTimeString(minutes, `M`);

  return `${daysString} ${hoursString} ${minutesString}`;
};

export {getTimeDifference};
