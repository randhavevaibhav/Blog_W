import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { API_BASE_URL, LOCAL_API_BASE_URL } from "../../../utils/constants";

export const apiAuthSignin = async (data) => {
  const axiosPrivate = useAxiosPrivate();

  const res = await axiosPrivate.post(`${LOCAL_API_BASE_URL}/signin`, data);
  // const res = await axios.post(`${API_BASE_URL}/signin`, data);
  return res;
};
