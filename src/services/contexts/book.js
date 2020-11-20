import React from 'react';
import { useAlert } from 'react-alert';
import api from '../api.config';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
// Context
const BooksContext = React.createContext({});

function BooksProvider(props) {
  const alert = useAlert();
  const geoloc = cookies.get('location');
  let LAT = geoloc ? geoloc.lat : null;
  let LONG = geoloc ? geoloc.long : null;

  const getGeoLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        let obj = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        };
        cookies.set('location', obj, { path: '/' });
        LAT = obj.lat;
        LONG = obj.long;
      },
      error => {
        if (error.code === 1) {
          alert.info(
            'Serviço de localização não autorizado, por favor autorize nas configurações do navegador para uma melhor experiência'
          );
        }
      }
    );
  };

  if (!LAT || !LONG) {
    getGeoLocation();
  }

  async function fetchBooks(type, title) {
    let charToAdd = `?`;

    let endpoint = `Book`;
    if (LAT && LONG && type) {
      endpoint += `${charToAdd}latitude=${LAT}&longitude=${LONG}`;
      charToAdd = `&`;
    }
    if (type) {
      endpoint += `${charToAdd}type=${type}`;
      charToAdd = `&`;
    }
    if (title) {
      endpoint += `${charToAdd}title=${title}`;
      charToAdd = `&`;
    }
    const { data } = await api.get(endpoint, {
      auth: true
    });

    if (data && data.result) {
      return data.result;
    }

    if (data && data.result) {
      return data.result;
    }

    return [];
  }

  async function fetchPublicBooks(type, title) {
    let endpoint = `Book/Public`;
    let charToAdd = `?`;

    if (LAT && LONG) {
      endpoint += `${charToAdd}latitude=${LAT}&longitude=${LONG}`;
      charToAdd = `&`;
    }
    if (type) {
      endpoint += `${charToAdd}type=${type}`;
      charToAdd = `&`;
    }
    if (title) {
      endpoint += `${charToAdd}title=${title}`;
      charToAdd = `&`;
    }
    const { data } = await api.get(endpoint, {
      auth: false
    });

    if (data && data.result) {
      return data.result;
    }

    if (data && data.result) {
      return data.result;
    }

    return [];
  }

  async function createBook(payload) {
    const data = await api.post('Book', {
      auth: true,
      body: payload
    });

    return data;
  }

  async function updateBook(payload) {
    const data = await api.put(`Book`, payload);

    return data;
  }

  async function deleteBook(id) {
    const data = await api.delete(`Book?id=${id}`);

    return data;
  }

  async function fetchBook(id) {
    const { data } = await api.get(`Book?id_book=${id}`, { auth: true });

    return data;
  }

  async function fetchBookStore() {
    let endpoint = `Store`;
    let charToAdd = `?`;

    if (LAT && LONG) {
      endpoint += `${charToAdd}latitude=${LAT}&longitude=${LONG}`;
      charToAdd = `&`;
    }

    const { data, errors } = await api.get(endpoint, {
      auth: false
    });

    if (errors) {
      return { errors };
    }

    if (data && data.result) {
      return data.result;
    }

    return [];
  }

  async function fetchBooksByStoreId(id) {
    let endpoint = `Book/Public?id_library=${id}`;

    const { data, errors } = await api.get(endpoint, {
      auth: false
    });

    if (errors) {
      return { errors };
    }

    if (data && data.result) {
      return { data: data.result };
    }

    return [];
  }

  async function fetchBookStoreById(id) {
    let endpoint = `Store?id=${id}`;

    const { data, errors } = await api.get(endpoint, {
      auth: false
    });

    if (errors) {
      return { errors };
    }

    if (data && data.result) {
      return { data: data.result };
    }

    return {};
  }

  return (
    <BooksContext.Provider
      value={{
        createBook,
        fetchBooks,
        fetchPublicBooks,
        deleteBook,
        updateBook,
        fetchBook,
        fetchBookStore,
        fetchBookStoreById,
        fetchBooksByStoreId
      }}
      {...props}
    />
  );
}

const useBooks = () => React.useContext(BooksContext);

export { BooksProvider, useBooks };
