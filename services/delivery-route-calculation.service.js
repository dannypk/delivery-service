import { findDeliveryRoute, initializeDeliveryRoutesWithVisitedFlag } from '../helpers/route.helper';

class DeliveryRouteCalculationService {

  _possibleDeliveryRoutes = 0;
  _cheapestDeliveryCost = 999;
  _possibleRoutesWithMaximumDeliveryCost = 0;

  calculateDeliveryRouteCost(route, deliveryRoutes) {
    let cost = 0;
    for (let index = 0; index < route.length - 1; index++) {
      const origin = route[index];
      const destination = route[index + 1];

      const deliveryRoute = findDeliveryRoute(origin, destination, deliveryRoutes);

      if (deliveryRoute) {
        cost += deliveryRoute.cost;
      } else {
        return 'No Such Route';
      }
    }

    return cost;
  }

  calculatePossibleDeliveryRoutes(origin, destination, deliveryRoutes, maximumStops) {
    this._possibleDeliveryRoutes = 0;

    const deliveryRoutesWithVisitedFlag = initializeDeliveryRoutesWithVisitedFlag(deliveryRoutes);
    this._findPossibleDeliveryRoutes(origin, destination, deliveryRoutesWithVisitedFlag, maximumStops);

    return this._possibleDeliveryRoutes;
  }

  calculatePossibleDeliveryRouteWithMaximumDeliveryCost(origin, destination, deliveryRoutes, deliveryCost) {
    this._possibleRoutesWithMaximumDeliveryCost = 0;
    this._findRouteWithMaximumDeliveryCost(origin, destination, deliveryRoutes, deliveryCost);

    return this._possibleRoutesWithMaximumDeliveryCost;
  }

  calculateMinimumDeliveryCost(origin, destination, deliveryRoutes) {
    this._cheapestDeliveryCost = 999;
    const flaggedDeliveryRoutes = deliveryRoutes.map(deliveryRoute => ({ ...deliveryRoute, visited: false }));
    this._findMinimumDelivery(origin, destination, flaggedDeliveryRoutes, 0);

    return this._cheapestDeliveryCost;
  }

  _findPossibleDeliveryRoutes(origin, destination, deliveryRoutes, stopsLeft) {
    if (stopsLeft !== undefined && !Number.isNaN(stopsLeft) && stopsLeft === 0) {
      return;
    }

    const clonedDeliveryRoutes = deliveryRoutes.map(dr => Object.assign({}, dr));
    const deliveryRoutesForOrigin = clonedDeliveryRoutes.filter(deliveryRoute => deliveryRoute.origin === origin);

    deliveryRoutesForOrigin.forEach(deliveryRoute => {
      if (!deliveryRoute.visited) {
        if (deliveryRoute.destination === destination) {
          this._possibleDeliveryRoutes++;
          return;
        }

        deliveryRoute.visited = true;
        this._findPossibleDeliveryRoutes(deliveryRoute.destination, destination, clonedDeliveryRoutes, stopsLeft - 1);
      }
    });
  }

  _findRouteWithMaximumDeliveryCost(origin, destination, deliveryRoutes, deliveryCost) {
    if (deliveryCost < 0) {
      return;
    }

    const deliveryRoutesForOrigin = deliveryRoutes.filter(deliveryRoute => deliveryRoute.origin === origin);
    deliveryRoutesForOrigin.forEach(deliveryRoute => {
      this._findRouteWithMaximumDeliveryCost(deliveryRoute.destination, destination, deliveryRoutes,
        deliveryCost - deliveryRoute.cost);
    });

    if (origin === destination) {
      this._possibleRoutesWithMaximumDeliveryCost++;
    }
  }

  _findMinimumDelivery(origin, destination, deliveryRoutes, deliveryCost) {
    const clonedDeliveryRoutes = deliveryRoutes.map(deliveryRoute => Object.assign({}, deliveryRoute));
    const deliveryRoutesForOrigin = clonedDeliveryRoutes.filter(deliveryRoute => deliveryRoute.origin === origin);

    deliveryRoutesForOrigin.forEach(deliveryRoute => {
      if (!deliveryRoute.visited) {
        const newDeliveryCost = deliveryCost + deliveryRoute.cost;
        if (deliveryRoute.destination === destination && newDeliveryCost < this._cheapestDeliveryCost) {
          this._cheapestDeliveryCost = newDeliveryCost;
          return;
        }

        deliveryRoute.visited = true;

        this._findMinimumDelivery(deliveryRoute.destination, destination, clonedDeliveryRoutes,
          deliveryCost + deliveryRoute.cost);
      }
    });
  }
}

export default new DeliveryRouteCalculationService();