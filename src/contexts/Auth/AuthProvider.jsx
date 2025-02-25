import { createContext, useState } from "react";
import { getLocalStorageItem } from "../../utils/browser";
import { localPersist } from "../../utils/constants";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  //console.log("persist in AuthProvider ", getLocalStorageItem("persist"));
  const [persist, setPersist] = useState(
    getLocalStorageItem(localPersist) || false
  );
  //console.log("calling AuthProvider ==>");
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};
