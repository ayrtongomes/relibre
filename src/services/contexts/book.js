import React from 'react';
import api from '../api.config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// Context
const BooksContext = React.createContext({});

function BooksProvider(props) {
  const geoloc = cookies.get('location');
  const LAT = geoloc ? geoloc.lat : null;
  const LONG = geoloc ? geoloc.long : null;

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
    const data = await api.post('Book', { auth: true, body: payload });

    return data;
  }

  async function updateBook(id, payload) {
    const data = await api.put(`Book/${id}`, payload);

    return data;
  }

  // async function fetchBook(id) {
  //   const URL = `book/${id}`;
  //   const { data } = await api.get(URL, { auth: true });

  //   return data;
  // }

  return (
    <BooksContext.Provider
      value={{
        createBook,
        fetchBooks,
        fetchPublicBooks,
        //fetchBook,
        updateBook
      }}
      {...props}
    />
  );
}

const useBooks = () => React.useContext(BooksContext);

export { BooksProvider, useBooks };
