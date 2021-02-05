import axios from 'axios';

import { MESSAGES } from '../constants';

const fetchIP = async () => {
  try {
    const result = await axios.get(`https://freegeoip.app/json/${process.env.REACT_APP_API_ADDRESS}`);

    return result.data;
  } catch (err) {
    alert(MESSAGES.GET_MAINCOORD_FAIL);
  }
};

export { fetchIP };
