// 175.126.38.231
import axios from 'axios';

const fetchIP = async () => {
  try {
    const result = await axios.get('https://freegeoip.app/json/175.126.38.231');

    console.log(result);
    return result.data;
  } catch (err) {
    console.error(err);
  }
}

export {
  fetchIP,
}
