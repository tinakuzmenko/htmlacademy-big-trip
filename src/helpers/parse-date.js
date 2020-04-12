const parseDate = (date) => {
  const dateValue = date.getDate();
  const monthValue = date.getMonth();
  const yearValue = date.getFullYear();

  const roundDate = new Date(yearValue, monthValue, dateValue);
  return Date.parse(roundDate);
};

export {parseDate};
