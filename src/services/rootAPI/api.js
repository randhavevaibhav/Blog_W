import axios from "axios";
import { LOCAL_API_BASE_URL, API_BASE_URL } from "../../utils/constants";

//for local ===>
export const axiosPrivate = axios.create({
  baseURL: `${LOCAL_API_BASE_URL}`,
  withCredentials: true,
});

export default axios.create({
  baseURL: `${LOCAL_API_BASE_URL}`,
});

//for PROD
// export const axiosPrivate = axios.create({
//   baseURL: `${API_BASE_URL}`,
//   withCredentials: true,
// });

// export default axios.create({
//   baseURL: `${API_BASE_URL}`,
// });
