const getTimeFormat = (time) => {
  const timeValues = Array.of(time.getHours(), time.getMinutes()).map((value) => {
    return value < 10 ? `0` + value : value;
  });

  return timeValues.join(`:`);
};

export {getTimeFormat};
