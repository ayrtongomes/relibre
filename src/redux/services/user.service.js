// import config from 'config';
import axios from 'axios';

// import {
//     authHeader
// } from "../../utils";
// import jwt_decode from 'jwt-decode';

export const userService = {
    login,
    logout
};

function login(user) {
    const authData = {
        user
    }
    const requestOptions = {
        crossDomain:true,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        // credentials: 'include',
        // cache: 'no-cache',
        // mode:'cors'
    };

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    return fetch(`${process.env.REACT_APP_API_URL}/Usuario/Login/`, requestOptions)
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(responseJson));
            if(responseJson.nome) document.location.href="/";
            //axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    // localStorage.removeItem('i18next_pt-BR-common');
    // localStorage.removeItem('i18next_es-common');
    // localStorage.removeItem('i18next_en-common');
    // localStorage.removeItem('currencyGeneralRulesData');
}

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`http://localhost:5000/users`, requestOptions).then(handleResponse);
// }

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // this.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        const user = {
            user: data
        };
        return user;
    });
}