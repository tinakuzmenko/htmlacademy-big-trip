import {TimeInMs} from './constants.js';

const getTimeDifference = (start, end) => {
  const differenceInMs = end - start;

  const days = Math.trunc(differenceInMs / TimeInMs.DAY);
  const daysString = days > 0 ? days + `D ` : ``;

  const hours = Math.trunc((differenceInMs % TimeInMs.DAY) / TimeInMs.HOUR);
  const hoursString = hours > 0 ? hours + `H ` : ``;

  const minutes = Math.trunc(((differenceInMs % TimeInMs.DAY) % TimeInMs.HOUR) / TimeInMs.MINUTE);
  const minutesString = minutes > 0 ? minutes + `M` : ``;

  return daysString + hoursString + minutesString;
};

export {getTimeDifference};
