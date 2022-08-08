import axios from "axios";

// @ts-ignore
export const Axios = (url, method, payload, headers = {}) => {
  return (async () => {
    try {
      return await axios.request({
        data: payload,
        method,
        url,
        headers,
      });
    } catch (error) {
      return error;
    }
  })();
};
