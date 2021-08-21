import {pointsByDate} from './mock/point-data.js';
import TripInfoPresenter from './presenter/trip-info.js';
import TripPresenter from './presenter/trip.js';

import './mock/point-destination.js'

const pageBody = document.querySelector('.page-body');

const tripInfo = new TripInfoPresenter(pageBody);
const trip = new TripPresenter(pageBody);

const initApp = () => {
  tripInfo.init(pointsByDate);
  trip.init(pointsByDate);
};

initApp();
