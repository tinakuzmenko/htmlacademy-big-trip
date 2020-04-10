const eventTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const eventActionsMap = {
  'Taxi': `to`,
  'Bus': `to`,
  'Train': `to`,
  'Ship': `to`,
  'Transport': `to`,
  'Drive': `to`,
  'Flight': `to`,
  'Check-in': `in`,
  'Sightseeing': `in`,
  'Restaurant': `in`,
};

const eventDestinations = [`Copenhagen`, `Longyearbyen`, `Tromsø`, `Reykjavík`, `Nuuk`, `Moscow`, `Tórshavn`];

const eventDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra. `,
  `Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
  `Sed sed nisi sed augue convallis suscipit in sed felis. `,
  `Aliquam erat volutpat. `,
  `Nunc fermentum tortor ac porta dapibus. `,
  `In rutrum ac purus sit amet tempus. `
];

const eventOffers = [{
  id: `luggage`,
  title: `Add luggage`,
  price: 30
},
{
  id: `comfort`,
  title: `Switch to comfort class`,
  price: 100
},
{
  id: `meal`,
  title: `Add meal`,
  price: 15
},
{
  id: `seats`,
  title: `Choose seats`,
  price: 5
},
{
  id: `train`,
  title: `Travel by train`,
  price: 40
},
{
  id: `uber`,
  title: `Order Uber`,
  price: 20
},
{
  id: `lunch`,
  title: `Lunch in city`,
  price: 30
},
{
  id: `car`,
  title: `Rent a car`,
  price: 200
},
{
  id: `tickets`,
  title: `Book tickets`,
  price: 40
},
{
  id: `breakfast`,
  title: `Add breakfast`,
  price: 50
}];

const getPhotoLink = () => {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
};

export {eventTypes, eventActionsMap, eventDestinations, eventDescriptions, eventOffers, getPhotoLink};
