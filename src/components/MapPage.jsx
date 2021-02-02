import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { mapAction, mapSelector } from '../features/slice';

import Map from './Map';
import Button from './Button';

function MapPage() {
  const dispatch = useDispatch();
  const { isLoading, mainCoord, error } = useSelector(mapSelector.all);
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    const { loadMainLatLng } = mapAction;

    dispatch(loadMainLatLng());
  }, []);

  return (
    <div>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>중심 좌표값을 가져오는데 실패했습니다. 다시 시도해주세요.</h3>}
      <h1>중심 좌표 값 : {mainCoord.lat}, {mainCoord.lng}</h1>
      <Map coordinates={mainCoord} />
      <Button handleClick={handleClick}>주변다각형</Button>
    </div>
  )
}

export default MapPage;
