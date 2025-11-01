import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/checkAuth`,
          {
            withCredentials: true,
          }
        );
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        console.log("User not logged in");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
