import React from 'react';
import api from '../api.config';

// Context
const BooksContext = React.createContext({});

function BooksProvider(props) {
  async function fetchBooks(type, title) {
    const LAT = -25.5034081;
    const LONG = -49.3090909;

    let baseURL = `Book?limit=50&latitude=${LAT}&longitude=${LONG}`;
    if (type) {
      baseURL + `&type=${type}`;
    }
    if (title) {
      baseURL + `&type=${title}`;
    }
    const { data } = await api.get(baseURL, {
      auth: true
    });

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
        //fetchBook,
        updateBook
      }}
      {...props}
    />
  );
}

const useBooks = () => React.useContext(BooksContext);

export { BooksProvider, useBooks };
