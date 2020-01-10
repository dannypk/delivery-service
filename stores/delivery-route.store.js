import { observable } from 'mobx';
import deliveryRouteCalculationService from '../services/delivery-route-calculation.service';

import { findDeliveryRoute } from '../helpers/route.helper';

import ROUTES from '../data/routes';

const NOT_YET_CALCULATED = 'Not yet calculated..';

class DeliveryRouteStore {
  @observable deliveryRoutes = [...ROUTES];
  @observable deliveryCost = NOT_YET_CALCULATED;
  @observable minimumDeliveryCost = NOT_YET_CALCULATED;
  @observable possibleDeliveryRoutes = NOT_YET_CALCULATED;
  @observable possibleRoutesWithMaximumDeliveryCost = NOT_YET_CALCULATED;

  addNewRoute(deliveryRoute) {
    const [origin, destination, cost] = deliveryRoute.split('');
    const routeAlreadyExists = findDeliveryRoute(origin, destination, this.deliveryRoutes);

    if (!origin || !destination || !cost|| routeAlreadyExists) {
      return;
    }

    this.deliveryRoutes.push({ origin, destination, cost: parseInt(cost) });
  }

  calculateCost(route) {
    const routeArray = route.split('-');
    this.deliveryCost = deliveryRouteCalculationService.calculateDeliveryRouteCost(routeArray, this.deliveryRoutes);
  }

  calculatePossibleDeliveries(route, maximumStops, maximumDeliveryCost) {
    const [origin, destination] = route.split('-');

    this.possibleDeliveryRoutes = deliveryRouteCalculationService.calculatePossibleDeliveryRoutes(
      origin, destination, this.deliveryRoutes, maximumStops
    );

    this.possibleRoutesWithMaximumDeliveryCost =
      deliveryRouteCalculationService.calculatePossibleDeliveryRouteWithMaximumDeliveryCost(
        origin, destination, this.deliveryRoutes, maximumDeliveryCost
      );

    this.minimumDeliveryCost = deliveryRouteCalculationService.calculateMinimumDeliveryCost(
      origin, destination, this.deliveryRoutes
    );

  }
}

export default new DeliveryRouteStore();