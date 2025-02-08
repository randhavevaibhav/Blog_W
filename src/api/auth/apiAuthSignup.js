import axios from "axios";
import { format } from "date-fns";

export const apiAuthSignup = async (data) => {
    
    const formData = {
      ...data,
      registered_at: format(new Date(), "dd-MM-yyyy"),
    };
  
    const res = await axios.post(`http://localhost:8003/signup`, formData);

    return res;
   
  };