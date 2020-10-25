import React, { useState, useEffect } from 'react';
import api from './api.config';

const AuthContext = React.createContext({});

function AuthProvider(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem(`@relibre:user`);

    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  const login = async ({ email, password }) => {
    const { data, errors } = await api.post('Account/Login', {
      body: {
        email,
        password
      }
    });

    // if (Object.keys(errors || {}).length) {
    //   return { errors };
    // }

    if (data.accessToken) {
      let user = {
        token: data.accessToken,
        ...data.user
      };

      localStorage.setItem(`@relibre:user`, JSON.stringify(user));

      const fullUser = await fetchUser(user.id);

      user = {
        ...user,
        ...fullUser
      };

      localStorage.setItem(`@relibre:user`, JSON.stringify(user));

      setUser(user);

      return { errors: {} };
    }
  };

  const logout = () => {
    setUser({});
    localStorage.setItem(`@relibre:user`, '');
    window.location.href = '/';
  };

  const register = async payload => {
    const { data } = await api.post(`Account/Register`, { body: payload });

    if (data) {
      return data;
    }
  };

  const updateUser = async payload => {
    const { data } = await api.put(`Account`, payload);

    const localUser = localStorage.getItem(`@relibre:user`);

    if (data) {
      const user = {
        ...JSON.parse(localUser),
        ...data
      };

      localStorage.setItem(`@relibre:user`, JSON.stringify(user));

      setUser(user);

      return data;
    }
  };

  const fetchUser = async id => {
    const { data: fullUser } = await api.get(`Account`, {
      auth: true
    });

    return fullUser;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        user,
        updateUser,
        fetchUser
      }}
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
