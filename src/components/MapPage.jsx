import React, { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

function MapPage({ options, onMount, className, onMountProps }) {
  const ref = useRef();
  const [map, setMap] = useState();

  console.log('hes')

  useEffect(() => {
    const mapOptions = {
      zoom: 10,
      center: { lat: 37.546, lng: 126.949 },
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

  // if (map && typeof onMount === 'function') {
  //   onMount(map, onMountProps)
  // }

  return (
    <div
      style={{ height: '500px', width: '100%' }}
      {...{ ref, className }}
    />
  )
}

export default memo(MapPage);

// MapPage.defaultProps = {
//   options: {
//     zoom: 10,
//     center: { lat: 37.546, lng: 126.949 },
//   },
// }