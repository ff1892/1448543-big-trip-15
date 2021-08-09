import {render, RenderPosition} from './utils/util-render.js';
import {MessagesPointsAbsent} from './utils/util-components.js';
import {pointsByDate} from './mock/point-data.js';

import TripInfoView from './view/trip-info.js';
import TotalCostView from './view/total-cost.js';
import RouteView from './view/route.js';
import MenuView from './view/menu.js';
import FilterView from './view/filters.js';
import SortingView from './view/sorting.js';
import ListView from './view/list.js';
import PointView from './view/point.js';
import PointEditView from './view/point-edit.js';
import PointsAbsentView from './view/points-absent.js';


const siteHeader = document.querySelector('.page-header');
const mainTrip = siteHeader.querySelector('.trip-main');
const tripControlsMenu = mainTrip.querySelector('.trip-controls__navigation');
const tripControlsFilters = mainTrip.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-main');
const tripEventsSection = siteMain.querySelector('.trip-events');

const tripInfoComponent = new TripInfoView();
const listComponent = new ListView();

const renderPoint = (list, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replacePointToForm = () => {
    list.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    list.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscapeKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscapeKeyDown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscapeKeyDown);
  });

  pointEditComponent.getElement().querySelector('.event--edit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscapeKeyDown);
  });

  pointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscapeKeyDown);
  });

  render(list, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderDataPage = (data) => {
  render(mainTrip, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
  render(tripInfoComponent.getElement(), new RouteView().getElement(), RenderPosition.BEFOREEND);
  render(tripInfoComponent.getElement(), new TotalCostView().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsSection, new SortingView().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsSection, listComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < data.length; i++) {
    renderPoint(listComponent.getElement(), data[i]);
  }
};

const renderPage = (data) => {

  render(tripControlsMenu, new MenuView().getElement(), RenderPosition.BEFOREEND);
  render(tripControlsFilters, new FilterView().getElement(), RenderPosition.BEFOREEND);

  if (data.length) {
    renderDataPage(data);
    return;
  }

  const pointsAbsentEverything = new PointsAbsentView(MessagesPointsAbsent.EVERYTHING);
  render(tripEventsSection, pointsAbsentEverything.getElement(), RenderPosition.BEFOREEND);
};

renderPage(pointsByDate);
