import deliveryRouteCalculationService from './delivery-route-calculation.service';

import ROUTES from '../data/routes';

describe('DeliveryRouteCalculationService spec', () => {

  describe('when calculating the cost between 2 routes', () => {
    describe('and the route exists', () => {
      it('should return the correct calculated cost for route A-D', () => {
        const cost = deliveryRouteCalculationService.calculateDeliveryRouteCost(['A', 'D'], ROUTES);
        expect(cost).toBe(10);
      });

      it('should return the correct calculated cost for route A-B-E', () => {
        const cost = deliveryRouteCalculationService.calculateDeliveryRouteCost(['A', 'B', 'E'], ROUTES);
        expect(cost).toBe(4);
      });

      it('should return the correct calculated cost for route E-A-C-F', () => {
        const cost = deliveryRouteCalculationService.calculateDeliveryRouteCost(['E', 'A', 'C', 'F'], ROUTES);
        expect(cost).toBe(8);
      });
    });

    describe('and the route does not exist', () => {
      it('should return the message No Such Route', () => {
        const cost = deliveryRouteCalculationService.calculateDeliveryRouteCost(['A', 'D', 'F'], ROUTES);
        expect(cost).toBe('No Such Route');
      });
    });
  });

  describe('when calculating number of possible delivery routes', () => {
    it('should return the 4 possible number of delivery routes for E D', () => {
      const possibleDeliveryRoutes =
        deliveryRouteCalculationService.calculatePossibleDeliveryRoutes('E', 'D', ROUTES, 4);
      expect(possibleDeliveryRoutes).toBe(4);
    });

    it('should return the 5 possible number of delivery routes for E E', () => {
      const possibleDeliveryRoutes =
        deliveryRouteCalculationService.calculatePossibleDeliveryRoutes('E', 'E', ROUTES);
      expect(possibleDeliveryRoutes).toBe(5);
    });
  });

  describe('when calculating number of possible delivery routes with delivery cost limit', () => {
    it('should return the 31 possible number of delivery routes for E E with cost less than 20', () => {
      const possibleDeliveryRouteWithMaximumDeliveryCost =
        deliveryRouteCalculationService.calculatePossibleDeliveryRouteWithMaximumDeliveryCost('E', 'E', ROUTES, 20);
      expect(possibleDeliveryRouteWithMaximumDeliveryCost).toBe(31);
    });
  });

  describe('when calculating cheapest delivery cost for route', () => {
    it('should return 9 the minimum delivery cost for E D', () => {
      const minimumDeliveryCost =
        deliveryRouteCalculationService.calculateMinimumDeliveryCost('E', 'D', ROUTES);
      expect(minimumDeliveryCost).toBe(9);
    });

    it('should return 9 the minimum delivery cost for E E', () => {
      const minimumDeliveryCost =
        deliveryRouteCalculationService.calculateMinimumDeliveryCost('E', 'E', ROUTES);
      expect(minimumDeliveryCost).toBe(6);
    });
  });
});