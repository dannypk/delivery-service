function findDeliveryRoute(origin, destination, deliveryRoutes) {
  return deliveryRoutes.find(route => route.origin === origin && route.destination === destination);
}

function initializeDeliveryRoutesWithVisitedFlag(deliveryRoutes) {
  return deliveryRoutes.map(deliveryRoute => ({ ...deliveryRoute, visited: false }));
}

export {
  findDeliveryRoute,
  initializeDeliveryRoutesWithVisitedFlag
};