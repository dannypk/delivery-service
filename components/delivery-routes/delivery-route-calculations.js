import React from 'react';
import { observer } from 'mobx-react';

import deliveryRouteStore from '../../stores/delivery-route.store';

@observer
class DeliveryRouteCalculations extends React.Component {

  render() {
    return (
      <div className="DeliveryRouteCalculations">
        <h3>Case 1</h3>
        Cost: {deliveryRouteStore.deliveryCost}

        <h3>Case 2</h3>
        <div>The number of possible delivery route with maximum stops (leave the maximum stops empty if you wish
          without) without using the same route twice in a delivery
          route: <b>{deliveryRouteStore.possibleRoutesWithMaximumDeliveryCost}</b>
        </div>
        <div>Bonus: The number of possible delivery route that delivery cost is less than provided.
          The same route can be used twice in a delivery route: <b>{deliveryRouteStore.possibleDeliveryRoutes}</b>
        </div>

        <h3>Case 3</h3>
        The cost of cheapest delivery route: <b>{deliveryRouteStore.minimumDeliveryCost}</b>
      </div>
    );
  }
}

export default DeliveryRouteCalculations;