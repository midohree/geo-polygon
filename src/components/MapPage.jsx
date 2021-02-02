import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { geoToH3, h3ToGeoBoundary, kRing, h3SetToMultiPolygon } from 'h3-js';

import { mapAction, mapSelector } from '../features/slice';

import Map from './Map';
import Button from './Button';

function MapPage() {
  const dispatch = useDispatch();
  const { isLoading, mainCoord, error } = useSelector(mapSelector.all);
  const [isClicked, setClicked] = useState(false);
  const [polygonCoords, setPolygonCoords] = useState({});

  console.log(mainCoord, 'mainCoord')

  const handleClick = () => {
    const h3Index = geoToH3(mainCoord.lat, mainCoord.lng, 7);
    const singlepolygonCoord = h3ToGeoBoundary(h3Index);

    const h3IndexArr = kRing(h3Index, 1);
    const multipolygonCoords = h3SetToMultiPolygon(h3IndexArr);

    console.log(h3Index, 'h3Index');
    console.log(singlepolygonCoord, '기본다각형 좌표값');
    console.log(h3IndexArr, 'kRing');
    console.log(multipolygonCoords, '멀티 폴리곤 좌표값');

    setPolygonCoords({
      singlepolygon: singlepolygonCoord,
      multipolygon: multipolygonCoords,
    });
    setClicked(true);
  }

  useEffect(() => {
    const { loadMainLatLng } = mapAction;

    dispatch(loadMainLatLng());
  }, []);

  return (
    <div>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>중심 좌표값을 가져오는데 실패했습니다. 다시 시도해주세요.</h3>}
      <h1>중심 좌표 값 : {mainCoord.lat}, {mainCoord.lng}</h1>
      {isLoading
        ? <h3>Loading...</h3>
        : <Map coordinates={mainCoord} polygonCoords={polygonCoords} isClicked={isClicked} />
      }
      <Button handleClick={handleClick}>주변다각형</Button>
    </div>
  )
}

export default MapPage;
