import axios from "axios";

export const apiAuthSignin = async (data) => {
  const res = await axios.post(`http://localhost:8003/signin`, data);
};
