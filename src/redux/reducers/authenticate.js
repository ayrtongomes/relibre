import * as actionTypes from '../actions/actionsTypes';

let user = JSON.parse(localStorage.getItem('logged'));
const initialState = user
  ? {
      loggedIn: true,
      user: user
    }
  : {
      loggedIn: false,
      logginFailed: false,
      user: {}
    };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        logginIn: false,
        logginFailed: true
      };
    case actionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
}
