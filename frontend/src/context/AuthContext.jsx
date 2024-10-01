import { createContext, useState, useContext } from 'react';
import { logoutRequest, signInnRequest, signUpRequest, verifySession } from '../api/auth';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async user => {
    try {
      const res = await signUpRequest(user);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  };

  const signIn = async user => {
    try {
      const res = await signInnRequest(user);
      setIsAuthenticated(true);
      setUser(res.data);

      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  };

  const logOut = async () => {
    try {
      await logoutRequest();
      Cookies.remove('token');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await verifySession(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        user,
        isAuthenticated,
        error,
        signIn,
        loading,
        logOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
