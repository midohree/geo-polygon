import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { geoToH3, h3ToGeoBoundary, kRing, h3SetToMultiPolygon } from 'h3-js';

import { mapAction, mapSelector } from '../features/slice';
import Map from './Map';
import Button from './Button';

function MapPage() {
  const dispatch = useDispatch();
  const { isLoading, mainCoord, error } = useSelector(mapSelector.all);
  const [count, setCount] = useState(0);
  const [polygonCoords, setPolygonCoords] = useState({});

  useEffect(() => {
    const { loadMainLatLng } = mapAction;

    dispatch(loadMainLatLng());
  }, []);

  const handleClick = () => {
    setCount(count + 1);

    const h3Index = geoToH3(mainCoord.lat, mainCoord.lng, 7);
    const singlepolygonCoord = h3ToGeoBoundary(h3Index);

    const h3IndexArr = kRing(h3Index, 1);
    const multipolygonCoords = h3SetToMultiPolygon(h3IndexArr);

    setPolygonCoords({
      singlepolygon: singlepolygonCoord,
      multipolygon: multipolygonCoords,
    });
  };

  return (
    <div>
      {error && <h3>중심 좌표값을 가져오는데 실패했습니다. 다시 시도해주세요.</h3>}
      {isLoading
        ? <h1>Loading...</h1>
        : <>
            <h3>중심 좌표 값 : {mainCoord.lat}, {mainCoord.lng}</h3>
            <Map coordinates={mainCoord} polygonCoords={polygonCoords} count={count} />
            <Button handleClick={handleClick}>
              {count ? '주변다각형' : '다각형보기'}
            </Button>
          </>
      }
    </div>
  );
}

export default MapPage;
