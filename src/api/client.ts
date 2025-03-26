import axios from 'axios';

const client = axios.create({
  baseURL: 'https://itunes.apple.com/us/rss',
});

export { client };
