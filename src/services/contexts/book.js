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
          alert.success(
            'Sem acesso a sua localização não será possível filtrar os livros mais próximos de ti'
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
    const data = await api.delete(`Book/${id}`);

    return data;
  }

  async function fetchBook(id) {
    const { data } = await api.get(`Book?id_book=${id}`, { auth: true });

    return data;
  }

  return (
    <BooksContext.Provider
      value={{
        createBook,
        fetchBooks,
        fetchPublicBooks,
        deleteBook,
        updateBook,
        fetchBook
      }}
      {...props}
    />
  );
}

const useBooks = () => React.useContext(BooksContext);

export { BooksProvider, useBooks };
