import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    let role = null;
    const token = localStorage.getItem("token");
    if (token) {
      role = JSON.parse(atob(token.split(".")[1])).role;
    }
    if (role) {
      setAuth({ role });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
