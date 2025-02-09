import axios from "axios";
import { format } from "date-fns";
import { API_BASE_URL } from "../../utils/constants";

export const apiAuthSignup = async (data) => {
  const formData = {
    ...data,
    registered_at: format(new Date(), "dd-MM-yyyy"),
  };

  const res = await axios.post(`${API_BASE_URL}/signup`, formData);

  return res;
};
