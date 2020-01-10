import React, { useState } from 'react';

import Button from '../common/button';
import FormInput from '../common/form-input';

import deliveryRouteStore from '../../stores/delivery-route.store';

import './delivery-route-calculation-input.less';

const DeliveryRouteCalculationInput = () => {
  const [deliverCost, setDeliverCost] = useState('A-B-E');
  const [route, setRoute] = useState('E-D');
  const [maximumStops, setMaximumStops] = useState(4);
  const [maximumDeliveryCost, setMaximumDeliveryCost] = useState(20);

  return (
    <div className="DeliveryRouteCalculationInput">

      <div className="DeliveryRouteCalculationInput-deliveryCost">
        <FormInput
          label="Route to calculate the deliver cost (case 1)"
          onChange={value => setDeliverCost(value)}
          value={deliverCost}
          placeholder="A-D, A-B-E, A-D-F..."
        />

        <Button label="Calculate cost (case 1)" onClick={() => deliveryRouteStore.calculateCost(deliverCost)}/>
      </div>

      <div className="DeliveryRouteCalculationInput-deliveryCost">
        <FormInput
          label="Route for calculations (case 2 and 3)"
          onChange={value => setRoute(value)}
          value={route}
          placeholder="A-B, E-E..."
        />
      </div>

      <div className="DeliveryRouteCalculationInput-deliveryCost">
        <FormInput
          label="Route to calculate the number of delivery cost with maximum stops of (case 2)"
          onChange={value => setMaximumStops(value)}
          value={maximumStops}
          placeholder="0, 1...  "
        />
      </div>

      <div className="DeliveryRouteCalculationInput-deliveryCost">
        <FormInput
          label="Route to calculate the number of delivery cost with maximum cost of (Bonus of case 2)"
          onChange={value => setMaximumDeliveryCost(value)}
          value={maximumDeliveryCost}
          placeholder="10, 20...  "
        />

      </div>

      <Button label="Calculate costs for cases 2 and 3" onClick={() =>
        deliveryRouteStore.calculatePossibleDeliveries(route, maximumStops, maximumDeliveryCost)}
      />

    </div>

  );
};

export default DeliveryRouteCalculationInput;