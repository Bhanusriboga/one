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
  body = null,
  headers = {},
  responseType = 'json'
) => {

  const makeCall = async () => {
    try{
      const fullUrl = url.startsWith('http') ? url : `${baseURL}/${url}`;
      const defaultHeaders = {
        'Content-Type':
          body instanceof FormData ? 'multipart/form-data' : 'application/json',
        ...headers,
      };


      const response = await await fetch(fullUrl, {
        method,
        headers: defaultHeaders,
        ...(body && method !== 'GET' && method !== 'HEAD' && { body }),
      });
      
      return response[responseType](); 
    }catch(error){
      console.log({error})// need to remove while deploy
      return Promise.reject(error);
    }
  };
  return await resolve(makeCall);
};

export default networkCall;
