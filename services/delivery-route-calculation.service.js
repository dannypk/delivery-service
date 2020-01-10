import { findDeliveryRoute, initializeDeliveryRoutesWithVisitedFlag } from '../helpers/route.helper';

class DeliveryRouteCalculationService {

  possibleDeliveryRoutes = 0;
  cheapestDeliveryCost = 999;
  possibleRoutesWithMaximumDeliveryCost = 0;

  calculateDeliveryRouteCost(route, deliveryRoutes) {
    let cost = 0;
    for (let index = 0; index < route.length - 1; index++) {
      let origin = route[index];
      let destination = route[index + 1];

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
    this.possibleDeliveryRoutes = 0;

    const deliveryRoutesWithVisitedFlag = initializeDeliveryRoutesWithVisitedFlag(deliveryRoutes);
    this._findPossibleDeliveryRoutes(origin, destination, deliveryRoutesWithVisitedFlag, maximumStops);

    return this.possibleDeliveryRoutes;
  }

  calculatePossibleDeliveryRouteWithMaximumDeliveryCost(origin, destination, deliveryRoutes, deliveryCost) {
    this.possibleRoutesWithMaximumDeliveryCost = 0;
    this._findRouteWithMaximumDeliveryCost(origin, destination, deliveryRoutes, deliveryCost);

    return this.possibleRoutesWithMaximumDeliveryCost;
  }

  calculateMinimumDeliveryCost(origin, destination, deliveryRoutes) {
    this.cheapestDeliveryCost = 999;
    const flaggedDeliveryRoutes = deliveryRoutes.map(deliveryRoute => ({ ...deliveryRoute, visited: false }));
    this._findMinimumDelivery(origin, destination, flaggedDeliveryRoutes, 0);

    return this.cheapestDeliveryCost;
  }

  _findPossibleDeliveryRoutes(origin, destination, deliveryRoutes, stopsLeft) {
    if (stopsLeft !== undefined && !isNaN(stopsLeft) && stopsLeft === 0) {
      return;
    }

    const clonedDeliveryRoutes = deliveryRoutes.map(dr => Object.assign({}, dr));
    const deliveryRoutesForOrigin = clonedDeliveryRoutes.filter(deliveryRoute => deliveryRoute.origin === origin);

    deliveryRoutesForOrigin.forEach(deliveryRoute => {
      if (!deliveryRoute.visited) {
        if (deliveryRoute.destination === destination) {
          this.possibleDeliveryRoutes++;
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
      this.possibleRoutesWithMaximumDeliveryCost++;
    }
  }

  _findMinimumDelivery(origin, destination, deliveryRoutes, deliveryCost) {
    const clonedDeliveryRoutes = deliveryRoutes.map(deliveryRoute => Object.assign({}, deliveryRoute));
    const deliveryRoutesForOrigin = clonedDeliveryRoutes.filter(deliveryRoute => deliveryRoute.origin === origin);

    deliveryRoutesForOrigin.forEach(deliveryRoute => {
      if (!deliveryRoute.visited ) {
        const newDeliveryCost = deliveryCost + deliveryRoute.cost;
        if (deliveryRoute.destination === destination && newDeliveryCost < this.cheapestDeliveryCost) {
          this.cheapestDeliveryCost = newDeliveryCost;
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