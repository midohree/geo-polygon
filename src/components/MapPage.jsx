import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { geoToH3, h3ToGeoBoundary, kRing, h3SetToMultiPolygon } from 'h3-js';

import { mapAction, mapSelector } from '../features/slice';
import { MESSAGES } from '../constants';
import Map from './Map';
import Button from './Button';
import ErrorPage from './ErrorPage';
import Loading from './Loading';

function MapPage() {
  const dispatch = useDispatch();
  const { isLoading, mainCoord, error } = useSelector(mapSelector.all);
  const [polygonStyle, setPolygonStyle] = useState('');
  const [polygonCoords, setPolygonCoords] = useState({});
  const count = useRef(0);

  useEffect(() => {
    const { loadMainLatLng } = mapAction;

    dispatch(loadMainLatLng());
  }, []);

  const handleClick = () => {
    const h3Index = geoToH3(mainCoord.lat, mainCoord.lng, 7);
    const singlepolygonCoord = h3ToGeoBoundary(h3Index);
    const h3IndexArr = kRing(h3Index, 1);
    const multipolygonCoords = h3SetToMultiPolygon(h3IndexArr);

    count.current += 1;
    count.current === 1 ? setPolygonStyle('singlepolygon') : setPolygonStyle('multipolygon');

    setPolygonCoords({
      singlepolygon: singlepolygonCoord,
      multipolygon: multipolygonCoords,
    });
  };

  return (
    <div>
      {error && <ErrorPage>{MESSAGES.GET_MAINCOORD_FAIL}</ErrorPage>}
      {isLoading
        ? <Loading />
        : <>
            <h3>중심 좌표 값 : {mainCoord.lat}, {mainCoord.lng}</h3>
            <Map polygonStyle={polygonStyle} coordinates={mainCoord} polygonCoords={polygonCoords} />
            <Button handleClick={handleClick}>
              {count ? '주변다각형' : '다각형보기'}
            </Button>
          </>
      }
    </div>
  );
}

export default MapPage;
