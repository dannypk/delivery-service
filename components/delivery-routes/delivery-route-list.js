import React from 'react';
import { observer } from 'mobx-react';

import deliveryRouteStore from '../../stores/delivery-route.store';

import './delivery-route-list.less';

@observer
class DeliveryRouteList extends React.Component {

  renderDeliveryRoute(deliveryRoute) {
    const formattedRoute = `${deliveryRoute.origin}${deliveryRoute.destination}${deliveryRoute.cost}`;
    return (
      <div className="DeliveryRouteList-item" key={formattedRoute}>
        {formattedRoute}
      </div>
    );
  }

  render() {
    return (
      <div className="DeliveryRouteList">
        Delivery Routes:
        {deliveryRouteStore.deliveryRoutes.map(deliveryRoute => this.renderDeliveryRoute(deliveryRoute))}
      </div>
    );
  }
}

export default DeliveryRouteList;