import React, { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

function Map({
  coordinates,
  polygonCoords,
  isClicked,
}) {
  const ref = useRef();
  const [map, setMap] = useState();
  const { lat, lng } = coordinates;

  console.log(coordinates, '센터');
  console.log(polygonCoords, '폴리곤');

  useEffect(() => {
    const mapOptions = {
      zoom: 10,
      center: { lat: lat, lng: lng },
    }

    const onLoad = () => {
      if (isClicked) {
        console.log('클릭되었씀')
        setMap(new window.google.maps.Polygon({
          paths: polygonCoords.singlePolygon,
          fillColor: '#0000ff',
          opacity: 0.5,
        }));
      }
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
  }, [isClicked]);

  return (
    <div style={{ height: '500px', width: '100%' }} {...{ ref }} />
  )
}

export default Map;

Map.propTypes = {
  coordinates: PropTypes.object.isRequired,
  polygonCoords: PropTypes.object.isRequired,
  isClicked: PropTypes.bool.isRequired,
};
