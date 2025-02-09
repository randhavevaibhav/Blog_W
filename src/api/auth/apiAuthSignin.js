import axios from "axios";
import { API_BASE_URL, LOCAL_API_BASE_URL } from "../../utils/constants";

export const apiAuthSignin = async (data) => {
  const res = await axios.post(`${LOCAL_API_BASE_URL}/signin`, data);
  return res;
};
