import React from 'react'
import Head from 'next/head'

import DeliveryRoute from '../components/delivery-routes/new-delivery-route';
import DeliveryRouteList from '../components/delivery-routes/delivery-route-list';
import DeliveryRouteCalculationInput from '../components/delivery-routes/delivery-route-calculation-input';
import DeliveryRouteCalculations from '../components/delivery-routes/delivery-route-calculations';

import './index.less';

const DeliveryRoutes = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico"/>
    </Head>
    <h1 className="title">Delivery Service</h1>

    <div>
      <p>Please note: there is not validation done for the fields, neither case sensitivity check.
        I didn't consider it part of the task. Please put the values as they are given in the example:
        <br/>
        Case 1: "A-B" or "A-B-E"
        <br/>
        Case 2: Please prefill the maximum stops (if wished) and maximum cost. The routes this time should be strictly
        1-1 (E-E, E-D, E-B) and not like in case 1 (A-B-E).
        <br/>
        For more tests, you can always add more routes (AD1, AC4, EM7)...
      </p>

      <DeliveryRouteList/>
      <DeliveryRoute/>
      <DeliveryRouteCalculationInput/>
      <DeliveryRouteCalculations />
    </div>
  </div>
);

export default DeliveryRoutes
