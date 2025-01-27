import axios from "axios";

const api = (method, url, variables) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params: method === "get" ? variables : undefined,
      data: method != "get" ? variables : undefined,
    })
      .then((response) => {
        if (method === "get") {
          resolve(response.data);
        }

        if (method === "post") {
          resolve(response.status);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export default {
  get: (...args) => api("get", ...args),
  post: (...args) => api("post", ...args),
};
