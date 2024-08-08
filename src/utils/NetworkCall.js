import axiosInstance from './axiosInstance';
import { baseURL } from '../config/config';
const resolve = async (promise) => {
  const resolved = {
    response: null,
    error: null,
  };
  try {
    const response = await promise();
    resolved.response = response;
  } catch (e) {
    resolved.error = 'Something went wrong...';
  }

  return resolved;
};

const networkCall = async (
  url,
  method = 'GET',
  data = null,
  headers = {},
  responseType = 'json'
) => {

  const makeCall = async () => {
    try{
      const fullUrl = url.startsWith('http') ? url : `${baseURL}/${url}`;
      const defaultHeaders = {
        'Content-Type':
          data instanceof FormData ? 'multipart/form-data' : 'application/json',
        ...headers,
      };

      const config = {
        method,
        url: fullUrl,
        headers: defaultHeaders,
        data,
        responseType,
      };
      const response = await axiosInstance(config);
      return response;
    }catch(error){
      console.log({error})// need to remove while deploy
      return;
    }
  };
  return await resolve(makeCall);
};

export default networkCall;
