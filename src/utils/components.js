import {FilterType} from '../const.js';

const POINTS_TO_SHOW = 3;

export const newPointButton = document.querySelector('.trip-main__event-add-btn');

export const MessagesNoPoints = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]:'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
  LOADING: 'Loading...',
};

export const createDestinationsTemplate = (points) => {
  const firstDestination = points[0].destination.name;
  const lastDestination = points[points.length - 1].destination.name;
  const uniquePoints = [...new Set(points.map((point) => point.destination.name))];

  if (uniquePoints.length === 2 && lastDestination === firstDestination) {
    uniquePoints.push(lastDestination);
    return uniquePoints.join(' &mdash; ');
  }

  if (uniquePoints.length <= POINTS_TO_SHOW) {
    return uniquePoints.join(' &mdash; ');
  }

  return `${firstDestination} &mdash; ... &mdash; ${lastDestination}`;
};

const getPointPrice = (point) => {
  const {offers, price} = point;
  const offersPrice = offers.reduce((initialPrice, offer) => initialPrice + offer.price, 0);
  return offersPrice + price;
};

export const getTotalPrice = (points) => points.reduce((initialTotal, point) => initialTotal + getPointPrice(point), 0);

export const handlePseudo = (removePseudo = true) => {
  const containers = document.querySelectorAll('.page-body__container');

  if (removePseudo) {
    containers.forEach((container) => container.classList.add('hidden-pseudo'));
    return;
  }

  containers.forEach((container) => container.classList.remove('hidden-pseudo'));
};

export const handleFilters = (disable = true) => {
  const filters = document.querySelectorAll('.trip-filters__filter-input');

  if(disable) {
    filters.forEach((filter) => filter.disabled = true);
    return;
  }

  filters.forEach((filter) => filter.disabled = false);
};
