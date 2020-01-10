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
      })
    })
  });

  describe('when calculating number of possible delivery routes', () => {
    it('should return the 4 possible number of delivery routes for E D', () => {
        deliveryRouteCalculationService.calculatePossibleDeliveryRoutes('E','D', ROUTES, 4);
      expect(deliveryRouteCalculationService.possibleDeliveryRoutes).toBe(4);
    });

    it('should return the 5 possible number of delivery routes for E E', () => {
      deliveryRouteCalculationService.calculatePossibleDeliveryRoutes('E','E', ROUTES);
      expect(deliveryRouteCalculationService.possibleDeliveryRoutes).toBe(5);
    });
  });

  describe('when calculating number of possible delivery routes with delivery cost limit', () => {
    it('should return the 31 possible number of delivery routes for E E with cost less than 20', () => {
      deliveryRouteCalculationService.calculatePossibleDeliveryRouteWithMaximumDeliveryCost('E','E', ROUTES, 20);
      expect(deliveryRouteCalculationService.possibleRoutesWithMaximumDeliveryCost).toBe(31);
    });
  });

  describe('when calculating cheapest delivery cost for route', () => {
    it('should return 9 the minimum delivery cost for E D', () => {
      deliveryRouteCalculationService.calculateMinimumDeliveryCost('E','D', ROUTES);
      expect(deliveryRouteCalculationService.cheapestDeliveryCost).toBe(9);
    });

    it('should return 9 the minimum delivery cost for E E', () => {
      deliveryRouteCalculationService.calculateMinimumDeliveryCost('E','E', ROUTES);
      expect(deliveryRouteCalculationService.cheapestDeliveryCost).toBe(6);
    });
  });
});