import axios from 'axios';

const request = axios.create({
  baseURL: 'https://stag-cms.thellsapi.com/v1/videocourse/',
  headers: { accessToken: '58f80c23-795b-4a87-91db-a79ae403d8c9' }
});

request.interceptors.response.use(function(response) {
  return response.data.msg;
});

export default request;
