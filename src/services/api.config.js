import fetch from 'utils/custom-fetch';
import getToken from 'utils/auth-header';

const API_BASE_URL = `https://relibre.herokuapp.com/api/v1/`;

const api = {
  get: (endpoint, { auth }) => {
    return fetch(API_BASE_URL + endpoint, {
      method: 'GET',
      ...(auth
        ? {
            headers: {
              ...getToken(),
              'Content-Type': 'application/json'
            }
          }
        : { headers: { 'Content-Type': 'application/json' } })
    });
  },
  post: (endpoint, params) => {
    const other = {
      ...(params.auth
        ? {
            headers: {
              ...getToken(),
              ...(params['Content-Type']
                ? {}
                : { 'Content-Type': 'application/json' })
            }
          }
        : {
            headers: {
              ...(params['Content-Type']
                ? {}
                : { 'Content-Type': 'application/json' })
            }
          })
    };

    return fetch(API_BASE_URL + endpoint, {
      method: 'POST',
      body:
        other.headers['Content-Type'] === 'application/json'
          ? JSON.stringify(params.body)
          : params.body,
      ...other
    });
  },
  delete: endpoint => {
    return fetch(API_BASE_URL + endpoint, {
      method: 'DELETE',
      headers: {
        ...getToken(),
        'Content-Type': 'application/json'
      }
    });
  },
  put: (endpoint, body) => {
    return fetch(API_BASE_URL + endpoint, {
      method: 'PUT',
      headers: {
        ...getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }
};

export default api;
