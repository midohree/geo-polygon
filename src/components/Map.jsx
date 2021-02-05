import React, { useState, useEffect, useRef, memo } from 'react';

import PropTypes from 'prop-types';

import { polylineOptions, mapOptions } from '../constants';

function Map({
  coordinates,
  polygonCoords,
  polygonStyle,
}) {
  const ref = useRef();
  const [map, setMap] = useState();
  const { lat, lng } = coordinates;

  useEffect(() => {
    const mapOptions = {
      zoom: 10,
      center: { lat: lat, lng: lng },
    };

    const onLoad = () => {
      setMap(new window.google.maps.Map(ref.current, { ...mapOptions }));
    };

    if (!window.google) {
      const script = document.createElement('script');

      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      document.head.append(script);
      script.addEventListener('load', onLoad);

      return () => script.removeEventListener('load', onLoad);
    } else {
      onLoad();
    }
  }, []);

  useEffect(() => {
    if(polygonStyle) {
      let singlepolygonArr = [];
      let multipolygonArr = [];

      switch(polygonStyle) {
        case 'singlepolygon': {
          const { singlepolygon } = polygonCoords;

          singlepolygon.forEach(el => {
            singlepolygonArr.push({ lat: el[0], lng: el[1] });
          });
          break;
        }
        case 'multipolygon': {
          const { multipolygon } = polygonCoords;

          multipolygon[0][0].forEach(el => {
            multipolygonArr.push({ lat: el[0], lng: el[1] });
          });
          break;
        }
        default:
          break;
      }

      const polyline = new window.google.maps.Polygon({
        paths: polygonStyle === 'singlepolygon' ? singlepolygonArr : multipolygonArr,
        ...polylineOptions,
      });

      polyline.setMap(map);
    }
  }, [polygonStyle]);

  return (
    <div style={mapOptions} {...{ ref }} />
  );
}

export default memo(Map);

Map.propTypes = {
  coordinates: PropTypes.object.isRequired,
  polygonCoords: PropTypes.object.isRequired,
  polygonStyle: PropTypes.string.isRequired,
};
