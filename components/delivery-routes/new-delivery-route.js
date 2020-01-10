import React, { useState } from 'react';

import Button from '../common/button';
import FormInput from '../common/form-input';

import deliveryRouteStore from '../../stores/delivery-route.store';
import './new-delivery-route.less';


const NewDeliveryRoute = () => {
  const [newDeliveryRoute, setNewDeliveryRoute] = useState('');

  return (
    <div className="NewDeliveryRoute">
      <FormInput
        label="New delivery route"
        onChange={value => setNewDeliveryRoute(value)}
        value={newDeliveryRoute}
        placeholder="AD1, AC4..."
      />

      <Button label="Add new delivery route" onClick={() => deliveryRouteStore.addNewRoute(newDeliveryRoute)} />
    </div>
  );
};

export default NewDeliveryRoute;