import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
// import { axiosPrivate } from "../../rootAPI/api";
import { format } from "date-fns";
import { API_BASE_URL, LOCAL_API_BASE_URL } from "../../../utils/constants";

export const apiAuthSignup = async (data, submitFormData) => {
  console.log("calling apiAuthSignup ==> ");
  const axiosPrivate = useAxiosPrivate();
  console.log("axiosPrivate from useAxiosPrivate ==> ");
  const formData = {
    ...data,
    registered_at: format(new Date(), "yyyy-MM-dd"),
  };

  console.log("formData apiAuthSignup ==> ", formData);

  const res = await axiosPrivate.post(`/signup`, formData);
  // const res = await axiosPrivate({
  //   url: `/signup`,
  //   data: formData,
  //   method: "post",
  // });
  // const res = await axiosPrivate.post(`${API_BASE_URL}/signup`, formData);

  return res;
};
