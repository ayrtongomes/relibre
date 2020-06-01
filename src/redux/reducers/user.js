import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
  userData: [],
  userDataFail: false,
  userDataPost: false,
  userUpdate: false
};

// const fetchUserData = (state, action) => {
//   return updateObject(state, {
//     userDataPost: action.userData
//   });
// };

const PutUserData = (state, action) => {
  return updateObject(state, {
    userUpdate: action.userUpdate
  });
};

const fetchUserFail = (state, action) => {
  return updateObject(state, {
    userDataFail: true
  });
};

const postUserData = (state, action) => {
  return updateObject(state, {
    userDataPost: action.userDataPost
  });
};

export function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.POST_USER_DATA:
      return postUserData(state, action);
    case actionTypes.PUT_USER_DATA:
      return PutUserData(state, action);
    case actionTypes.FETCH_USER_FAILED:
      return fetchUserFail(state, action);
    default:
      return state;
  }
}
