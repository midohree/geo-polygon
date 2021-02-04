import React, { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

function Map({
  coordinates,
  polygonCoords,
  count,
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
    if (count > 0) {
      let singlepolygonArr = [];
      let multipolygonArr = [];

      if (count === 1) {
        const { singlepolygon } = polygonCoords;

        singlepolygon.forEach(el => {
          singlepolygonArr.push({ lat: el[0], lng: el[1]});
        });
      } else {
        const { multipolygon } = polygonCoords;

        multipolygon[0][0].forEach(el => {
          multipolygonArr.push({ lat: el[0], lng: el[1]});
        });
      }

      const polyline = new window.google.maps.Polygon({
        paths: count === 1 ? singlepolygonArr : multipolygonArr,
        strokeColor: '#000',
        fillColor: '#0000ff',
        opacity: 0.5,
      });

      polyline.setMap(map);
    }
  }, [count]);

  return (
    <div style={{ height: '500px', width: '100%' }} {...{ ref }} />
  );
}

export default memo(Map);

Map.propTypes = {
  coordinates: PropTypes.object.isRequired,
  polygonCoords: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
};
