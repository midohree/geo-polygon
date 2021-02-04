import axios from 'axios';

const fetchIP = async () => {
  try {
    const result = await axios.get(`https://freegeoip.app/json/${process.env.REACT_APP_API_ADDRESS}`);

    return result.data;
  } catch (err) {
    console.error(err);
  }
};

export { fetchIP };
