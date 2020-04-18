const renderOptions = (cities) => {
  return cities.map((city) => {
    return (`<option value="${city}"></option>`.trim());
  })
  .join(`\n`);
};

export {renderOptions};
