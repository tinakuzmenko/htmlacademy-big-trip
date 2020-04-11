const getDateAndTimeFormat = (date) => {
  const dateYear = date.getFullYear().toString().slice(2, 4);

  const dateValues = Array.of(date.getDate(), date.getMonth(), date.getHours(), date.getMinutes()).map((value) => {
    return value < 10 ? `0` + value : value;
  });

  const [dateDay, dateMonth, dateHours, dateMinutes] = dateValues;

  return dateDay + `/` + dateMonth + `/` + dateYear + ` ` + dateHours + `:` + dateMinutes;
};

export {getDateAndTimeFormat};
