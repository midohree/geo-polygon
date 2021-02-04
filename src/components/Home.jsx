import React from 'react';
import { useHistory } from 'react-router-dom';

import FloatingButton from './FloatingButton';

function Home() {
  const history = useHistory();
  const movePage = path => history.push(path);

  return (
    <div>
      <h1>Geo Polygon</h1>
      <FloatingButton onClick={movePage} path={'/h3'}>START</FloatingButton>
    </div>
  );
}

export default Home;
