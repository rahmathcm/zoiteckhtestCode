import axios, {CancelToken} from 'axios';
import {Storage} from '../utils';
import {env} from '../config';

const axiosInstance = axios.create({
  baseURL: env?.apiUrl,
});

const TOKEN_ERR = 'Token expired. Please login again.';

let reset = () => {};
const updateReset = _reset => (reset = _reset);

/**Function to log network errors in console */
const networkErrorLogger = async (
  e,
  URL,
  PAYLOAD,
  CONFIG,
  isAuthenticated = true,
) => {
  console.info(`CONFIG: ${JSON.stringify(CONFIG)}`);
  console.info(`Requested URL: ${URL}`);
  console.info(`PAYLOAD : ${JSON.stringify(PAYLOAD)}`);
  console.info(JSON.stringify(e?.message));
  if (axios.isCancel(e)) {
    throw e?.message;
  }
  if (typeof e === 'string') {
    throw e;
  }
  if (e?.message === 'Network Error') {
    throw 'Network Error. Ensure you are connected to internet.';
  }
  const {status, data} = e?.response;
  // if (isAuthenticated && status === 401) {
  //   await Storage.logOut();
  //   setTimeout(() => reset(), 100);
  //   throw TOKEN_ERR;
  // }
  const {error, metadata} = data;
  if (typeof error === 'string') {
    if (metadata) {
      throw {error, metadata};
    }
    throw error;
  }
  if (status !== 429) {
    throw '';
  }
  throw 'Something went wrong';
};

/* Function to add access and id token to requests*/
const setUpConfig = async () => {
  try {
    const result = await checkTokenExpiry();
    if (!result) {
      return false;
    }
    const access_token = await Storage.getUserAccessToken();
    const CONFIG = {
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };
    return CONFIG;
  } catch (e) {
    return false;
  }
};

const setUpMultipartConfig = async () => {
  try {
    // await checkTokenExpiry();
    const access_token = await Storage.getUserAccessToken();
    const CONFIG = {
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };
    return CONFIG;
  } catch (e) {
    console.log('Error Setting Config');
  }
};

// Function for GET requests
const get = async (URL, isAuthenticated = true, params = {}, cancelToken) => {
  // console.log(URL)
  let CONFIG = 'nil';
  try {
    let result;
    if (isAuthenticated) {
      CONFIG = await setUpConfig();
      if (!CONFIG) {
        throw TOKEN_ERR;
      }
      result = await axiosInstance.get(URL, {
        ...CONFIG,
        params: {...CONFIG?.params, ...params},
        cancelToken,
      });
      console.log(result)

    } else {
      result = await axiosInstance.get(URL, {params});

    }
    return result.data.data;
  } catch (e) {
    await networkErrorLogger(e, URL, 'nil', CONFIG);
  }
};

/**Function for POST requests */
const post = async (
  URL,
  PAYLOAD = {},
  isAuthenticated = true,
  params = {},
  cancelToken,
  fileUpload = false,
) => {
  let CONFIG = 'nil';
  try {
    let result;
    if (isAuthenticated) {
      CONFIG = fileUpload ? await setUpMultipartConfig() : await setUpConfig();
      if (!CONFIG) {
        throw TOKEN_ERR;
      }
      result = await axiosInstance.post(URL, PAYLOAD, {
        ...CONFIG,
        params: {...CONFIG?.params, ...params},
        cancelToken,
      });
    } else {
      result = await axiosInstance.post(URL, PAYLOAD, {
        params,
      });
    }
    return result.data;
  } catch (e) {
    await networkErrorLogger(e, URL, PAYLOAD, CONFIG, isAuthenticated);
  }
};

/**Function for PUT requests */
const put = async (
  URL,
  PAYLOAD = {},
  isAuthenticated = true,
  params = {},
  fileUpload = false,
) => {
  let CONFIG = 'nil';
  try {
    let result;
    if (isAuthenticated) {
      CONFIG = fileUpload ? await setUpMultipartConfig() : await setUpConfig();
      if (!CONFIG) {
        throw TOKEN_ERR;
      }
      result = await axiosInstance.put(URL, PAYLOAD, {
        ...CONFIG,
        params: {...CONFIG?.params, ...params},
      });
    } else {
      result = await axiosInstance.put(URL, PAYLOAD, {params});
    }
    return result.data;
  } catch (e) {
    await networkErrorLogger(e, URL, PAYLOAD, CONFIG);
  }
};

/**Function for DELETE requests */
const _del = async (URL, PAYLOAD = {}, isAuthenticated = true, params = {}) => {
  let CONFIG = 'nil';
  try {
    let result;
    if (isAuthenticated) {
      CONFIG = await setUpConfig();
      if (!CONFIG) {
        throw TOKEN_ERR;
      }
      const delConfig = {data: PAYLOAD, headers: CONFIG.headers};
      result = await axiosInstance.delete(URL, {
        ...delConfig,
        params: {...delConfig?.params, ...params},
      });
    } else {
      const delConfig = {data: PAYLOAD};
      result = await axiosInstance.delete(URL, {
        ...delConfig,
        params: {...delConfig?.params, ...params},
      });
    }
    return result.data.data;
  } catch (e) {
    await networkErrorLogger(e, URL, PAYLOAD, CONFIG);
  }
};

/*
  Function to check token expiry
  Token generated time and current time are compared. New Token is
  requested if difference is greater than 10 minutes.
*/
const checkTokenExpiry = async () => {
  try {
    const tokenGeneratedTime = await Storage.getAccessTokenCreatedTime();
    if (tokenGeneratedTime + 10 * 60 * 1000 <= new Date().getTime()) {
      const token = await Storage.getUserRefreshToken();
      const {access_token, refresh_token} = await get(
        '/auth/refresh-token',
        false,
        {token},
      );
      await Storage.setUserAccessToken(access_token);
      await Storage.setUserRefreshToken(refresh_token);
      await Storage.setAccessTokenCreatedTime(new Date().getTime());
    }
    return true;
  } catch (e) {
    return false;
  }
};

const generateCancelToken = () => {
  let cancelToken, cancelCallback;
  cancelToken = new CancelToken(c => (cancelCallback = c));
  return {cancelToken, cancelCallback};
};

export {put, post, get, _del, updateReset, generateCancelToken};
