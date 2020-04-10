const renderOptions = (cities) => {
  return cities.map((city) => {
    return (`<option value="${city}"></option>`);
  })
  .join(`\n`);
};

export {renderOptions};
