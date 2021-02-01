import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { getTargetLatLng } from '../redux/map/mapSlice';
import { fetchIP } from '../utils/api';
import Map from './Map';
import Button from './Button';

function MapPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const result = await fetchIP();
        const { latitude, longitude } = result;
        const coordinates = { lat: latitude, lng: longitude };

        dispatch(getTargetLatLng(coordinates));
      } catch (err) {
        console.log(err, 'err in component');
      }
    })();
  }, []);

  return (
    <div>
      <Map />
      <Button>주변다각형</Button>
    </div>
  )
}

export default MapPage;
