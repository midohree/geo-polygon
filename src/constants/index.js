const ROUTES = {
  LANDING: '/',
  MAP: '/h3',
};

const NAME = {
  MAP: 'MAP',
};

const MESSAGES = {
  GET_MAINCOORD_FAIL: '중심좌표 값을 가져오는데 실패했습니다. 다시 시도해주세요.',
};

const polylineOptions = {
  strokeColor: '#000',
  fillColor: '#0000ff',
  opacity: 0.5,
};

const mapOptions = {
  height: '500px',
  width: '100%',
};

export { ROUTES, NAME, MESSAGES, polylineOptions, mapOptions };
