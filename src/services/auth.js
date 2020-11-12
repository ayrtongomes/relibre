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

  const login = async ({ login, password }) => {
    const { data, errors } = await api.post('Account/Login', {
      body: {
        login: login,
        password: password
      }
    });

    if (errors) {
      return { errors };
    }

    if (data && data.result.access_Token) {
      let user = {
        token: data.result.access_Token,
        login: data.result.login,
        name: data.result.name,
        birthDate: data.result.birthDate,
        phone: data.result.phone,
        fullAddress: data.result.address
      };

      // const fullUser = await fetchUser(data.result.token);

      user = {
        ...user
        // ...fullUser
      };

      localStorage.setItem(`@relibre:user`, JSON.stringify(user));
      setUser(user);

      return { errors: {} };
    }
  };

  const logout = () => {
    setUser({});
    localStorage.setItem(`@relibre:user`, '');
    window.location.href = '/login';
  };

  const register = async payload => {
    const { data, errors } = await api.post(`Account/Register`, {
      body: payload
    });

    if (data) {
      return data;
    }
  };

  const updateUser = async payload => {
    const { data } = await api.put(`Account`, payload);

    const localUser = localStorage.getItem(`@relibre:user`);
    if (data && data.result) {
      const user = {
        ...JSON.parse(localUser),
        name: data.result.name,
        birthDate: data.result.birthdate,
        phone: data.result.phones[0].number,
        fullAddress: data.result.addresses[0].full_address
      };

      localStorage.setItem(`@relibre:user`, JSON.stringify(user));

      setUser(user);

      return { data: data.result };
    }
  };

  const fetchUser = async token => {
    const { data } = await api.get(`Account`, {
      auth: true
    });
    if (data && data.result) {
      setUser(state => {
        return { ...state, ...data.result };
      });

      localStorage.setItem(
        `@relibre:user`,
        JSON.stringify({ ...user, ...data.result })
      );
      return data.result;
    }
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
