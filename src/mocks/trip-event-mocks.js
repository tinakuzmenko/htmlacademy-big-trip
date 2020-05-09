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

const eventOffers = [{
  id: `luggage`,
  title: `Add luggage`,
  isChecked: Math.random() > 0.5,
  price: 30
},
{
  id: `comfort`,
  title: `Switch to comfort class`,
  isChecked: Math.random() > 0.5,
  price: 100
},
{
  id: `meal`,
  title: `Add meal`,
  isChecked: Math.random() > 0.5,
  price: 15
},
{
  id: `seats`,
  title: `Choose seats`,
  isChecked: Math.random() > 0.5,
  price: 5
},
{
  id: `train`,
  title: `Travel by train`,
  isChecked: Math.random() > 0.5,
  price: 40
},
{
  id: `uber`,
  title: `Order Uber`,
  isChecked: Math.random() > 0.5,
  price: 20
},
{
  id: `lunch`,
  title: `Lunch in city`,
  isChecked: Math.random() > 0.5,
  price: 30
},
{
  id: `car`,
  title: `Rent a car`,
  isChecked: Math.random() > 0.5,
  price: 200
},
{
  id: `tickets`,
  title: `Book tickets`,
  isChecked: Math.random() > 0.5,
  price: 40
},
{
  id: `breakfast`,
  title: `Add breakfast`,
  isChecked: Math.random() > 0.5,
  price: 50
}];

export {eventTypes, eventActionsMap, eventDestinations, eventOffers};
