import React, { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

function Map({
  coordinates,
}) {
  const ref = useRef();
  const [map, setMap] = useState();
  const { lat, lng } = coordinates;

  console.log(lat, lng);

  useEffect(() => {
    const mapOptions = {
      zoom: 10,
      center: { lat: lat, lng: lng },
    }

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

  return (
    <div style={{ height: '500px', width: '100%' }} {...{ ref }} />
  )
}

export default Map;

Map.propTypes = {
  coordinates: PropTypes.object.isRequired,
};
