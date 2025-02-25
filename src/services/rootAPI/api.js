import axios from "axios";
import config from "../../utils/config";


export const axiosPrivate = axios.create({
  baseURL: `${config.API}`,
  withCredentials: true,
});

export default axios.create({
  baseURL: `${config.API}`,
});
